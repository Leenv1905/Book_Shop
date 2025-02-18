import React from "react";
import { Box } from "@mui/material";
import Grid from "@mui/material/Grid";
import PostCard from '../../components/display/free/PostCard';
import BreadcrumbsComponent from '../../components/display/free/BreadcrumbsComponent'; // Component Breadcrumbs
import PaginationComponent from '../../components/display/free/PaginationComponent'; // Component phân trang


const BlogPage = () => {
  const posts = [
    {
      image: "/demo/images/post-item1.jpg",
      category: "Books",
      title: "10 Must-Read Books of the Year: Our Top Picks!",
      description:
        "Dive into the world of cutting-edge technology with our latest blog post, where we highlight five essential gadgets.",
      postLink: "single-post.html",
      categoryLink: "blog.html",
    },
    {
      image: "/demo/images/post-item2.jpg",
      category: "Books",
      title: "The Fascinating Realm of Science Fiction",
      description:
        "Explore the intersection of technology and sustainability in our latest blog post. Learn about the innovative...",
      postLink: "single-post.html",
      categoryLink: "blog.html",
    },
    {
      image: "/demo/images/post-item3.jpg",
      category: "Books",
      title: "Finding Love in the Pages of a Book",
      description:
        "Stay ahead of the curve with our insightful look into the rapidly evolving landscape of wearable technology.",
      postLink: "single-post.html",
      categoryLink: "blog.html",
    },
    {
      image: "/demo/images/post-item4.jpg",
      category: "Books",
      title: "Reading for Mental Health: How Books Can Heal and Inspire",
      description:
        "In today's remote work environment, productivity is key. Discover the top apps and tools that can help you stay productive.",
      postLink: "single-post.html",
      categoryLink: "blog.html",
    },
    {
        image: "/demo/images/post-item1.jpg",
        category: "Books",
        title: "10 Must-Read Books of the Year: Our Top Picks!",
        description:
          "Dive into the world of cutting-edge technology with our latest blog post, where we highlight five essential gadgets.",
        postLink: "single-post.html",
        categoryLink: "blog.html",
      },
      {
        image: "/demo/images/post-item2.jpg",
        category: "Books",
        title: "The Fascinating Realm of Science Fiction",
        description:
          "Explore the intersection of technology and sustainability in our latest blog post. Learn about the innovative...",
        postLink: "single-post.html",
        categoryLink: "blog.html",
      },
      {
        image: "/demo/images/post-item3.jpg",
        category: "Books",
        title: "Finding Love in the Pages of a Book",
        description:
          "Stay ahead of the curve with our insightful look into the rapidly evolving landscape of wearable technology.",
        postLink: "single-post.html",
        categoryLink: "blog.html",
      },
      {
        image: "/demo/images/post-item4.jpg",
        category: "Books",
        title: "Reading for Mental Health: How Books Can Heal and Inspire",
        description:
          "In today's remote work environment, productivity is key. Discover the top apps and tools that can help you stay productive.",
        postLink: "single-post.html",
        categoryLink: "blog.html",
      },
  ];

  return (
    <>
    <BreadcrumbsComponent         
    title="Blogs"
    breadcrumbs={[
      { label: "Home", href: "/" },
      { label: "Blog" },
      { label: "Blog" } // Không có href → là trang hiện tại
    ]}/>

    <Box
      id="latest-posts"
      sx={{ py: 6 }}
    >
      <Grid 
        container 
        spacing={4}
        justifyContent="center"
        sx={{
          width: "100%",
          maxWidth: "xl",
          margin: "0 auto",
        }}
      >
        {posts.map((post, index) => (
          <Grid 
            item 
            xs={12} sm={6} md={6} lg={3} 
            key={index}
            sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
          >
            <Box 
              sx={{ 
                width: 350, 
                maxHeight: 480,
                overflow: "hidden",
                display: "flex", 
                flexDirection: "column",
              }}
            >
              <PostCard {...post} />
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>

    <PaginationComponent />

    </>
  );
};

export default BlogPage;
