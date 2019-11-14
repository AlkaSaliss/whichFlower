import os
import glob
import shutil
import tqdm
import argparse
import numpy as np


def split_class(in_path, out_path, class_, train_split=0.7):
    """Function that splits image dataset into train, validation and test sets

    Arguments:
        in_path {str} -- path to the folder containing subdirectories, each containing images for a given class
        out_path {str} -- path to the folder where the split data will be saved
        class_ {list} -- list of image classes, corresponding also to the subdirectories (of `in_path`) names

    Keyword Arguments:
        train_split {float} -- proportion of the train set in the original dataset (default: {0.7})
    """

    assert 0 < train_split < 1, "The train_split value should be a float between 0 and 1"
    p = os.path.join(in_path, class_)
    ps = sorted(glob.glob(os.path.join(p, '*.jpg')))
    np.random.seed(123)
    np.random.shuffle(ps)
    size = len(ps)

    val_ratio = (1 - train_split)/2

    p_train = ps[: int(np.ceil(size*train_split))]
    p_val = ps[int(np.ceil(size*train_split)): int(np.ceil(size*train_split)) + int(np.ceil(size*val_ratio))]
    p_test = ps[int(np.ceil(size*train_split)) + int(np.ceil(size*val_ratio)):]

    dest_path = os.path.join(out_path, 'train', str(class_))
    os.makedirs(dest_path, exist_ok=True)

    print("*******[COPYING TRAIN IMAGES]***********")
    for im in tqdm.tqdm_notebook(p_train):
        shutil.copy(im, dest_path)

    print("*******[COPYING VALIDATION IMAGES]***********")
    dest_path = os.path.join(out_path, 'valid', str(class_))
    os.makedirs(dest_path, exist_ok=True)
    for im in tqdm.tqdm_notebook(p_val):
        shutil.copy(im, dest_path)

    print("*******[COPYING TEST IMAGES]***********")
    dest_path = os.path.join(out_path, 'test', str(class_))
    os.makedirs(dest_path, exist_ok=True)
    for im in tqdm.tqdm_notebook(p_test):
        shutil.copy(im, dest_path)


default_p = "../../../../COMPUTER_VISION/flowers-recognition/flowers"
default_classes = ['daisy', 'dandelion', 'rose', 'tulip', 'sunflower']
out_path = "../../../../COMPUTER_VISION/flowers-recognition/split_data"


def split_flower_data(root_path=default_p, out_path=out_path, classes=default_classes, train_split=0.7):
    """Function that splits image dataset into train, validation and test sets

    Arguments:
        in_path {str} -- path to the folder containing subdirectories, each containing images for a given class
        out_path {str} -- path to the folder where the split data will be saved
        class_ {list} -- list of image classes, corresponding also to the subdirectories (of `in_path`) names

    Keyword Arguments:
        train_split {float} -- proportion of the train set in the original dataset (default: {0.7})
    """

    os.makedirs(out_path, exist_ok=True)

    for cl in classes:
        print("==========CLASS : {}===========".format(cl))
        split_class(root_path, out_path, cl, train_split)
        print("===============================\n\n")

if __name__ == "__main__":

    parser = argparse.ArgumentParser(description="Helper module for spliting a dataset into train, valid and test sets")
    parser.add_argument("--in_path", type=str,
                        default="../../../../COMPUTER_VISION/flowers-recognition/flowers",
                        help="Path to the folder containing the subfolders, each subfolder contains" +
                        " images for a given class")
    parser.add_argument("--out_path", type=str,
                        default="../../../../COMPUTER_VISION/flowers-recognition/split_data",
                        help="Path to the output folder. train, valid and test subfolders will be created" +
                                " for training, validation and test images")
    parser.add_argument("--classes", nargs='+',
                        default=['daisy', 'dandelion',
                                 'rose', 'tulip', 'sunflower'],
                        help="list of the classes names")
    parser.add_argument("--train_split", type=float,
                        default=0.7,
                        help="float number ranging from 0 to 1, representing the proportion of data to put in" +
                        " training set the remaining will be split equally between validation and test sets")

    args = parser.parse_args()

    split_flower_data(args.in_path, args.out_path, args.classes, args.train_split)
