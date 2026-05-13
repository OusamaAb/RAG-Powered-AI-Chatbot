# CPS843 — Computer Vision

## Course Overview
CPS843 introduced the foundations of computer vision through both theory and hands-on implementation. The course covered how images are represented, transformed, enhanced, filtered, stitched, and interpreted using classical computer vision techniques. The assignments started with basic image intensity transformations and filtering in MATLAB, then moved into projective geometry, camera models, SIFT feature matching, image stitching, and a final OpenCV-based document scanner with OCR text extraction.

## Institution / Program
Toronto Metropolitan University, Software Engineering, Electrical and Computer Engineering Department

## Term / Date
Fourth Year, Fall Semester, 2025

## Main Topics
The main topics covered in this course included image intensity transformations, log transforms, inverse-log transforms, power-law/gamma correction, bit-plane slicing, histogram analysis, histogram equalization, spatial filtering, image sharpening, denoising, edge detection, low-light enhancement, affine transformations, projective geometry, camera models, feature matching, image stitching, document detection, perspective correction, OCR preprocessing, and text extraction.

The course also covered more advanced computer vision concepts such as homogeneous coordinates, ideal points, the line at infinity, conics, projective transformations, affine transformations, similarity transformations, camera intrinsics, camera extrinsics, projection matrices, optical centers, vanishing points, principal planes, MLESAC, SIFT, and panorama generation.

## Theory Learned
In this course, I learned how digital images can be represented, transformed, enhanced, and analyzed using classical computer vision techniques. A major early focus was pixel intensity transformations. I learned how log transforms stretch darker pixel values to make low-intensity regions easier to see, while inverse-log transforms emphasize brighter regions. I also learned how power-law/gamma correction changes image brightness depending on the gamma value. When gamma is less than 1, the image becomes brighter because darker values are stretched. When gamma is greater than 1, the image becomes darker because lower intensity values are compressed.

I also learned about bit-plane slicing, which breaks an 8-bit grayscale image into separate binary layers. This helped show that the most significant bits contain most of the recognizable structure of an image, while the least significant bits mostly contain fine details or noise. Reconstructing an image using only the higher bit planes showed that much of the image can still be preserved even when lower bit information is removed.

Another important theory topic was histogram analysis and histogram equalization. I learned how to compute pixel intensity probabilities, cumulative distribution functions, and mapped intensity values. This showed how contrast enhancement can be performed mathematically by redistributing pixel values across a wider intensity range. This was useful for understanding why histogram equalization can make dark or low-contrast images easier to interpret.

The course also covered spatial filtering and edge detection. I learned how smoothing filters reduce noise, how sharpening filters enhance fine details, and how first-order and second-order derivatives are used to detect intensity changes. First-order derivatives highlight where intensity changes occur, while second-order derivatives and the Laplacian highlight where those changes start and end. I also compared Roberts, Prewitt, and Sobel edge detectors. Roberts is simple but more sensitive to noise, Prewitt provides more continuous edges, and Sobel usually gives stronger edges because it gives more weight to the center pixels.

In the geometry portion of the course, I learned about homogeneous coordinates, ideal points, the line at infinity, conics, projective transformations, affine transformations, and similarity transformations. These concepts explained how points, lines, shapes, and images behave under different transformations and camera viewpoints. I also learned what properties are preserved by each transformation type. Projective transformations preserve incidence and cross-ratio, affine transformations preserve parallelism, and similarity transformations preserve angles and length ratios.

Later in the course, I studied camera geometry. I learned how the camera intrinsic matrix stores focal length, skew, and principal point information. I also learned how projection matrices connect 3D world points to 2D image points, and how the projection matrix can be used to understand the optical center, vanishing points, and principal plane of a camera.

I also learned the theory behind SIFT feature matching and image stitching. SIFT detects stable keypoints that remain useful even when images change in scale, rotation, viewpoint, or lighting. These keypoints can be matched across overlapping images and used to estimate geometric transformations such as homographies. This allows multiple images to be stitched together into a panorama.

## Lab Work
Assignment 1 focused on image intensity transformations, bit-plane slicing, histogram equalization, and affine warping. I worked with a grayscale image and applied log transforms, inverse-log transforms, and power-law transformations with gamma values of 0.3 and 3. This helped me understand how mathematical mappings can change the brightness and contrast of an image. The log transform made darker regions more visible, the inverse-log transform emphasized brighter areas, gamma less than 1 brightened the image, and gamma greater than 1 darkened the image.

In the same assignment, I performed bit-plane slicing on an 8-bit grayscale image. I separated the image into eight bit planes, from the least significant bit to the most significant bit. The lower bit planes did not clearly show the original image, while the higher bit planes preserved most of the visible structure. I then reconstructed the image using bit planes 7 and 8, and again using bit planes 5 through 8. This showed that adding more high-order bit planes makes the reconstructed image closer to the original.

I also worked with histogram equalization in Assignment 1. I compared the original grayscale image and gamma-transformed images before and after equalization. This showed how equalization spreads pixel intensities across a wider range and improves contrast. I also manually performed histogram equalization using tables of pixel counts, probability values, cumulative distribution values, and mapped intensity levels. This helped me understand the actual step-by-step math behind the equalization process instead of only using a built-in function.

The final part of Assignment 1 involved affine shearing and image padding methods. I applied a shear transformation to a soccer image and tested different padding options, including fill, replicate, bound, circular, and symmetric padding. This showed how geometric transformations can create empty regions in the output image and how different padding methods fill those regions. Fill padding used a solid color, replicate padding copied edge pixels outward, circular padding repeated the image, and symmetric padding mirrored the image at the boundary.

Problem Set 2 focused on edge detection, image sharpening, noise removal, Laplacian operations, and low-light enhancement. I compared Roberts, Prewitt, and Sobel edge detectors on the same image. Roberts used small diagonal masks and was more sensitive to noise. Prewitt produced more continuous edges by averaging over a 3×3 region. Sobel produced the sharpest and most defined edges because it gives more weight to center pixels in the gradient calculation.

I also manually calculated first-order and second-order derivatives. The first derivative showed where image intensity changed, while the second derivative highlighted where those changes started and ended. This connected the math behind derivatives to the practical idea of finding edges in an image.

For image sharpening, I implemented unsharp masking and high-boost filtering. The process involved creating a blurred version of the image, subtracting the blurred image from the original to create a detail mask, and adding the mask back to the original image. With k = 1, the result was standard unsharp masking. With a larger k value, such as k = 5, the image became much sharper, but it could also become more intense and noisy. This showed the trade-off between sharper detail and possible noise amplification.

For noise removal, I added Gaussian noise to an image and tested average filters and Gaussian filters. The average filter removed noise strongly, but it also blurred edges and fine details. The Gaussian filter gave a better balance because it reduced noise while preserving more natural edges and details. This helped me understand that smoothing is not only about removing noise, but also about preserving useful image information.

I also worked with 2D derivatives and the Laplacian operator. I manually calculated horizontal derivatives, vertical derivatives, and the Laplacian matrix for a small 3-bit image. The Laplacian emphasized areas where pixel intensity changed quickly, and normalization scaled the values into a clearer range for interpretation.

The final part of Problem Set 2 explored low-light image enhancement. I used MATLAB’s `imlocalbrighten` function with different settings, including default brightening, reduced brightening, and alpha blending. I compared the enhanced images and their histograms. The results showed that brightness and contrast improved because the pixel values shifted toward higher intensity ranges, making dark objects and scenes easier to see.

Problem Set 3 focused on projective geometry, conics, MLESAC, point clouds, and early project planning. I worked with homogeneous coordinates, line intersections, ideal points, and the line at infinity. One key idea was that parallel lines meet at a point at infinity in projective space, represented using homogeneous coordinates where the third coordinate is zero.

I also studied how points, lines, and conics transform under projective transformations. I derived how lines transform using the inverse transpose of a homography and how conics transform under a projective mapping. This helped connect matrix operations to the geometric behavior of images and shapes.

Another part of Problem Set 3 compared projective, affine, and similarity transformations. I learned their degrees of freedom and what each type of transformation preserves. Projective transformations preserve incidence and cross-ratio. Affine transformations preserve parallelism. Similarity transformations preserve angles and length ratios. This made it easier to understand why different transformations are used for different vision problems.

The assignment also included conics and circular points. I verified that any circle in the 2D plane intersects the line at infinity at the two circular points. I also worked with the dual conic relationship used to describe orthogonality between lines.

For robust model fitting, I studied MLESAC. MLESAC improves on RANSAC by using likelihood-based scoring instead of only counting inliers. It assumes inliers are close to the model and follow a Gaussian distribution, while outliers can appear anywhere and follow a uniform distribution. This makes MLESAC useful for computer vision tasks such as estimating homographies, the fundamental matrix, and other geometric relationships when there are many outliers.

The practical coding part of Problem Set 3 involved 3D point cloud processing. I loaded a point cloud, selected a region of interest, fit a sphere to selected points using `pcfitsphere`, extracted the inlier points, and displayed the detected globe point cloud. This introduced 3D computer vision and showed how model fitting can be applied beyond regular 2D images.

Problem Set 4 focused on camera models, projection matrices, SIFT, and image stitching. I studied the camera intrinsic matrix and learned what each parameter represents, including focal length in the x and y directions, skew, and the principal point. I also learned how assuming rectangular pixels removes the skew parameter and changes the degrees of freedom.

I worked through how to recover camera parameters from a projection matrix. This involved taking the left 3×3 submatrix, using RQ decomposition to separate the intrinsic matrix and rotation matrix, and then recovering the translation vector and camera center.

The assignment also covered the optical center, vanishing points, and the principal plane. I verified that the first three columns of the projection matrix correspond to vanishing points along the world X, Y, and Z axes. I also showed that the last row of the projection matrix defines the principal plane, meaning points on that plane project to points at infinity in the image.

For the practical portion, I studied SIFT feature matching and image stitching. I explained how SIFT detects stable keypoints, assigns orientations, builds 128-value descriptors, and matches those descriptors across images. I then used AutoStitch64 to stitch six overlapping Lake Como images into a panorama. The final panorama showed that matched keypoints and homographies could align mountains, buildings, and water into one consistent image.

## Projects / Deliverables
The main final project for the course was **Document Scanner with Text Extraction Using Classical Computer Vision Techniques**. The goal of this project was to build an end-to-end system that detects a document from a photo, corrects its perspective, enhances the image, and extracts readable text using OCR. The problem being solved was that photographed documents are often captured at poor angles, under uneven lighting, or with background clutter, which makes OCR unreliable.

The project began with document detection. The input image was resized to reduce computation while still preserving enough detail for boundary detection. It was then converted to grayscale, blurred using a Gaussian filter, and processed with Canny edge detection. Dilation was applied to close small gaps in the edges, and external contours were extracted. Each contour was approximated using the Douglas-Peucker algorithm, and the largest four-sided polygon was selected as the likely document boundary.

After detecting the document corners, I implemented point ordering so the four points could be used correctly for perspective transformation. The top-left, top-right, bottom-right, and bottom-left points were identified using sums and differences of the x and y coordinates. This was important because the homography transformation requires the source points to be in a consistent order.

The next stage was perspective correction. I computed the output dimensions using distances between the detected corner points, calculated a 3×3 homography matrix using `cv2.getPerspectiveTransform`, and applied `cv2.warpPerspective` to create a flat top-down view of the document. This directly connected to the projective geometry concepts learned in the course.

The preprocessing pipeline was a major part of the project. The corrected document image was upscaled by a factor of four, denoised using non-local means denoising, enhanced using CLAHE, sharpened using unsharp masking, and binarized using both Otsu thresholding and adaptive Gaussian thresholding. The system selected the thresholded version that preserved more text content. Morphological closing was also used to reconnect broken characters, and the polarity was adjusted so the final image had black text on a white background.

For OCR, I used Tesseract with the configuration `--oem 3 --psm 6`. The extracted text was then cleaned by normalizing whitespace and line breaks. I also added word-level and line-level bounding box visualization using `pytesseract.image_to_data`. Words were grouped into lines based on vertical proximity, and column breaks were detected using horizontal gap analysis. This made the output more useful because the system did not only extract text, but also showed where the OCR engine detected words and lines.

I also added an interactive adjustment interface. If the automatic boundary detection was not accurate, the user could manually drag the document corners or fine-tune them with keyboard controls before applying the perspective transformation. This made the system more practical because real document images can have weak edges, shadows, blur, or cluttered backgrounds.

The system was evaluated on five document images taken under different angles and lighting conditions. The results showed document detection accuracy between 90% and 97% IoU, OCR character accuracy between 88% and 94%, and processing times between 1.7 and 2.2 seconds. The analysis showed that angled images reduced boundary detection accuracy because visible edges became weaker. It also showed that preprocessing significantly improved OCR performance, especially contrast enhancement and adaptive thresholding.

Overall, the final project demonstrated a complete classical computer vision pipeline. The system took an input image, detected document boundaries, allowed user correction, applied perspective transformation, enhanced the image, extracted text with OCR, and visualized word and line bounding boxes. This project showed that classical computer vision techniques can still be used to build a useful and explainable real-world system without relying on deep learning.

## Tools / Technologies
The tools and technologies used in this course included MATLAB, MATLAB Image Processing Toolbox, AutoStitch64, Python 3.9, OpenCV, NumPy, Tesseract OCR, pytesseract, Canny edge detection, Gaussian filtering, average filtering, CLAHE contrast enhancement, adaptive Gaussian thresholding, Otsu thresholding, non-local means denoising, homography and perspective transformation, contour detection, polygon approximation, SIFT feature matching, and GitHub for project source code and documentation.

## Skills Demonstrated
This course demonstrated my ability to apply classical image processing techniques to improve brightness, contrast, sharpness, and visibility. I implemented and analyzed intensity transformations, gamma correction, histogram equalization, bit-plane slicing, spatial filtering, edge detection, denoising, sharpening, and low-light enhancement.

I also demonstrated an understanding of geometric computer vision by working with affine transformations, projective transformations, homogeneous coordinates, ideal points, conics, projection matrices, optical centers, vanishing points, and principal planes.

On the practical side, I used MATLAB for image processing assignments, AutoStitch64 for panorama generation, and Python/OpenCV for the final document scanner project. I built a complete document scanning pipeline using edge detection, contour detection, corner ordering, homography warping, OCR preprocessing, Tesseract text extraction, and bounding box visualization.

The course also demonstrated my ability to evaluate computer vision systems using both visual analysis and quantitative results, including detection accuracy, OCR character accuracy, and processing time.

## Key Takeaways
The biggest takeaway from CPS843 was that computer vision depends on both image quality and geometry. Simple preprocessing steps such as denoising, contrast enhancement, thresholding, and sharpening can significantly improve later tasks such as OCR and feature detection.

Another key takeaway was the importance of geometric correction. Concepts like homography, perspective transformation, projective geometry, and camera projection matrices are not just theoretical. They directly apply to real systems such as document scanners, panorama stitching, and camera-based measurement.

The final project made this very clear because the system depended on multiple course concepts working together. Edge detection and contour analysis found the document, projective geometry corrected the perspective, preprocessing improved the image quality, and OCR extracted the final text. This showed me how classical computer vision techniques can be combined to solve a real problem in a practical and explainable way.

## Related Portfolio Topics
Document Scanner with Text Extraction, OCR and document digitization, classical computer vision, image preprocessing and enhancement, edge detection and contour detection, homography and perspective correction, image stitching and panorama generation, SIFT feature matching, camera geometry and projection matrices, MATLAB image processing, Python/OpenCV computer vision applications.
