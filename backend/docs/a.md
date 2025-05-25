Components

1. MediaService
   The core service that handles all interactions with Cloudinary:

Configuration: Initializes with Cloudinary credentials from environment variables
Upload: Converts file buffers to base64 and uploads to Cloudinary
Metadata Retrieval: Gets detailed information about existing media
Deletion: Removes files from Cloudinary
Transformation: Generates URLs with transformation parameters 2. Controllers & Routes
Exposes RESTful endpoints for media operations:

POST /media/upload: Upload a new file
GET /media/:publicId/metadata: Retrieve metadata for a file
DELETE /media/:publicId: Delete a file 3. Integration Points
The media system integrates with other domains:

Restaurant Domain: For restaurant profile images
Menu Item Domain: For menu item images, including multiple images per item
Configuration
Environment Variables
File Upload Constraints
Size Limit: 10MB maximum
Formats:
Images: JPEG, PNG, GIF, WebP
Videos: MP4, WebM
Documents: PDF
Security
The media upload system implements several security measures:

Authentication: All media endpoints require authentication
Authorization: Role-based access control limits who can upload/delete
Validation: Strict file type checking prevents malicious uploads
Size Limits: Prevents denial of service via large file uploads
Usage Flow
Uploading Files
Frontend: Client prepares form data with file
Authentication: Client includes authentication token
Upload: POST request to /media/upload
Processing: Server validates, processes, and uploads to Cloudinary
Response: Server returns metadata including URLs
Integration: Client uses returned URL in subsequent requests to restaurant APIs
Example Upload Response
Integration with Restaurant APIs
Restaurant Image Updates
When updating a restaurant profile with a new image:

First upload the image using the media API
Then use the returned URL in the restaurant update payload:
Menu Item Image Management
Menu items can have multiple images, with one marked as primary:

Upload each image separately
Include all image URLs in the menu item payload:
Image Transformations
The system supports dynamic image transformations via Cloudinary:

Resizing: Generate thumbnails or responsive sizes
Cropping: Automatically focus on the important parts
Format Conversion: Optimize format based on browser support
Quality Adjustment: Balancing quality vs. performance
Example transformation URL for a 300x300 thumbnail:

Error Handling
The API returns appropriate error responses:

400 Bad Request: Invalid file type, missing file, etc.
401 Unauthorized: Missing or invalid authentication
403 Forbidden: Insufficient permissions
413 Payload Too Large: File exceeds size limit
500 Internal Server Error: Cloudinary connection issues, etc.
Best Practices
Optimize Before Upload: Resize large images on the client when possible
Use Image Variants: Create and store different sizes for different contexts
Clean Up Unused Media: Delete unused files to save storage
Set Alt Text: Always provide descriptive alt text for accessibility
Use Secure URLs: Always use HTTPS (secureUrl) from the response
Troubleshooting
Common issues and solutions:

Issue Possible Causes Solution
Upload fails File too large Resize/compress before uploading
Upload fails Invalid file type Check accepted file formats
Image not showing URL not saved correctly Verify URL in database
Slow uploads Large file sizes Implement client-side compression
"Not found" errors Deleted from Cloudinary Check if file exists in Cloudinary
Technical Details
The implementation uses the following technologies:

Multer: For handling multipart/form-data and file uploads
Cloudinary Node.js SDK: For interacting with Cloudinary APIs
TypeScript: For type safety throughout the codebase
Express.js: For routing and middleware
