# Database Schema

We already have a table for articles.

Store image metadata

|table|columns|
|-|-|
|images|id|
||filename|
||mimetype|
||original_filename|
||size|
||created_at|
||updated_at|

Link image to article

|table|columns|
|-|-|
|article_images|id|
||article_id|
||image_id|
||created_at|
||updated_at|
