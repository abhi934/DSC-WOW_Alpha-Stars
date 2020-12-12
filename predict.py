import sys
import cv2
import matplotlib.pyplot as plt
import cvlib as cv
from cvlib.object_detection import draw_bbox

im = cv2.imread("img/"+ sys.argv[1])
bbox, label, conf = cv.detect_common_objects(im)
print(str(label.count('car')) + "," +str(label.count('bus'))+"," +str(label.count('person')))