---
---

@import "{{ site.theme }}";

# whichFlower : a flower species recognition app using tensorflow/keras and React-Native

<p style="color:red;">
  As a passionate person about computer vision (CV), I came to know that model deployment is also important in model development process because the usefulness of a model is measured by the satisfaction of end users. In a previous project I named DEmoClassi (Demographic (age, gender race) and Emotion (happy, neutral, angry, ...) Classification) I tried to turned my trained models in a standalone python module that can be run on windows/Linux using OpenCV. [You can check it here](https://github.com/AlkaSaliss/DEmoClassi).
</p>


In this new project I decided to give mobile technologies a try. Today the models are migrating more and more to the edge devices (mobile, sensors, ... IOT in general). So I started by learning React-Native, a cross-platform mobile development framework developed by Facebook. The course [is available on youtube](https://www.youtube.com/playlist?list=PLhQjrBD2T382gdfveyad09Ierl_3Jh_wR), it is a little bit long, but it worth learning it.
The end goal for me was to combine my 2 passions, CV and programming into another project : this time I opted for CV model training and deployment on mobile device of a flower species recognition app I called, with no suspens,  `WhichFlower`.

I'll try to describe my journey using this post composed of three sections : 

* Exploratory Data Analysis in which I analyse the flower images dataset I'll use
* Image classification models training
* Model deployment using React-Native

{%include_relative html_files/EDA.html %}