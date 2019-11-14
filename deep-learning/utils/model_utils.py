from sklearn.metrics import classification_report
from sklearn.metrics import confusion_matrix
import matplotlib.pyplot as plt
import numpy as np
import tqdm
import itertools
import tensorflow as tf
import shutil


class CopyCheckpointToDrive(tf.keras.callbacks.Callback):
    """Callback to copy the model checkpoint to another folder at the end of training.
       Particularly useful when training on google colab and want to copy best model to google drive
    """

    def __init__(self, src_path, dest_path):
        """Set the params

        Arguments:
            src_path {str} -- full path to the best model checkpoint
            dest_path {str} -- path to the destination folder where best model will be copied to,
                                typically a google drive folder
        """

        super().__init__()

        self.src_path = src_path
        self.dest_path = dest_path

    def on_train_end(self, logs=None):
        shutil.copy(self.src_path, self.dest_path)
        super().on_train_end(logs=logs)


class UnfreezeCallback(tf.keras.callbacks.Callback):
    """Callback for unfreezing a pretrained model after certain number of epochs for finetuning
    """

    def __init__(self, unfreeze_epoch=10):
        """Initialize the callback
        
        Keyword Arguments:
            unfreeze_epoch {int} -- epoch at which unfreeze all the weights (default: {10})
        """
        super(UnfreezeCallback, self).__init__()
        self.unfreeze_epoch = unfreeze_epoch

    def set_model(self, model):
        self.model = model

    def on_epoch_begin(self, epoch, logs=None):

        if epoch == self.unfreeze_epoch:
            for layer in self.model.layers:
                layer.trainable = True
        if epoch == self.unfreeze_epoch + 1:
            print(self.model.summary())


def plot_confusion_matrix(y_true, y_pred, title='Classification Report',
                          labels_=None, target_names=None, normalize=False):
    """
    Utility function for plotting confusion matrix for classification evaluation
    :param y_true: true labels array
    :param y_pred: predicted labels array
    :param title: Title of the confusion matrix plot
    :param labels_: list of unique labels (e.g. in classification with two classes it could be [0, 1])
    :param target_names: names list for unique labels (e.g. in two classes classification it can be ['male', 'female'])
    :param normalize: boolean, whether to print number in confusion matrix as percentage or not
    :return:
    """

    # print classification report
    print(classification_report(y_true, y_pred,
                                labels=labels_, target_names=target_names))

    # plot the confusion matrix
    cm = confusion_matrix(y_true, y_pred)

    accuracy = np.trace(cm) / float(np.sum(cm))
    misclass = 1 - accuracy

    cmap = plt.get_cmap('Blues')

    plt.figure(figsize=(8, 6))
    plt.imshow(cm, interpolation='nearest', cmap=cmap)
    plt.title(title)
    plt.colorbar()

    tick_marks = np.arange(len(target_names))
    plt.xticks(tick_marks, target_names, rotation=45)
    plt.yticks(tick_marks, target_names)

    if normalize:
        cm = cm.astype('float') / cm.sum(axis=1)[:, np.newaxis]

    thresh = cm.max() / 1.5 if normalize else cm.max() / 2
    for i, j in itertools.product(range(cm.shape[0]), range(cm.shape[1])):
        if normalize:
            plt.text(j, i, f"{cm[i, j]:.4f}",
                     horizontalalignment="center",
                     color="white" if cm[i, j] > thresh else "black")
        else:
            plt.text(j, i, f"{cm[i, j]}",
                     horizontalalignment="center",
                     color="white" if cm[i, j] > thresh else "black")

    plt.tight_layout()
    plt.ylabel('True label')
    plt.xlabel(
        f'Predicted label\naccuracy={accuracy:.4f}; misclass={misclass:.4f}')
    plt.show()


def inference_val_gen(gen):
    """takes in a standard keras generator and yield only the x,
     instead of x and y, for making predictions
    
    Arguments:
        gen {keras generator} -- a keras generator yielding x and y
    """
    for x, y in gen:
        # due to problem with tpu if batch size is not divisible by the number
        # of tpu cores (here 8), esp. the last batch we need to a little control here
        if x.shape[0] % 8 == 0:
            yield x
        else:
            batch_size = x.shape[0]
            remains = 8 - (batch_size % 8)
            x = np.concatenate([x, x[-remains:]])
            yield x


def inference_val_gen(gen, gen_type="x"):
    """takes in a standard keras generator and yield only x or only y,
     instead of x and y, for making predictions
    
    Arguments:
        gen {keras generator} -- a keras generator yielding x and y
    
    Keyword Arguments:
        gen_type {str} -- string `x` or `y` to chose which value to yield between x and y (default: {"x"})
    """

    # generator length
    gen_len = len(gen)

    for i, (x, y) in tqdm.tqdm_notebook(enumerate(gen)):
        # due to problem with tpu if batch size is not divisible by the number
        # of tpu cores (here 8), esp. the last batch we need to a little control here
        batch_size = x.shape[0]

        if batch_size % 8 == 0:
            if gen_type == "x":
                yield x
            else:
                yield np.argmax(y, axis=1)
        else:
            remains = 8 - (batch_size % 8)
            if gen_type == "x":
                yield np.concatenate([x, x[-remains:]])
            else:
                yield np.argmax(
                    np.concatenate([y, y[-remains:]]),
                    axis=1
                )
        if i == gen_len - 1:
            return
