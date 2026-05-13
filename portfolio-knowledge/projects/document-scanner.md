# Document Scanner

## One-Line Summary
An OpenCV and Tesseract pipeline that finds a document in a photo, corrects perspective, preprocesses the page, and extracts readable text.

## Problem
Photos of documents are skewed, shadowed, and noisy. Off-the-shelf OCR alone often fails unless the page is cropped, flattened, and contrast-normalized first.

## Solution
The pipeline detects the document region, applies geometric correction, improves contrast and noise, then runs OCR so extracted text is more accurate and usable downstream.

## My Role
I implemented the vision stages and OCR flow end to end in CPS843 as the culminating assignment, building on earlier work in transforms, edges, and geometry. This project page matches that scanner pipeline and how I describe it on my resume.

## Tech Stack
OpenCV, Tesseract OCR, Python, classical computer vision (contours, homography, thresholding, edge detection).

## Key Features
Document detection in images, perspective correction to a top-down view, preprocessing for readability, and text extraction with OCR.

## Technical Implementation
The system follows a classical CV stack: edge detection and contour finding to locate candidate page boundaries, homography to warp the document to a rectangular fronto-parallel view, thresholding and filtering to reduce noise and improve binarization, then Tesseract for line and word extraction. Parameters are tuned so real phone photos with mild perspective and lighting variation still produce a usable crop for OCR.

## Challenges
Glare, low light, and cluttered backgrounds create false contours; aggressive thresholding can erase thin strokes needed for OCR.

## How I Solved Them
I combined contour filtering heuristics with sanity checks on aspect ratio and area, tried adaptive thresholding where global thresholds failed, and iterated on morphological steps so text strokes stayed connected without merging characters.

## Impact / Results
A clear demonstration of geometry plus OCR working together, not only calling an OCR API on a raw camera frame.

## Good Interview Talking Points
Homography versus affine fits for pages, when Tesseract PS Modes help, measuring character error rates on a fixed test set, and moving toward a mobile capture guide UX.

## Related Skills
Computer vision, OpenCV, OCR, image geometry, preprocessing, Python, signal and image processing fundamentals.
