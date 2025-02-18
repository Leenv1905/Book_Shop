import React from "react";
import { Box, Grid, Typography, TextField, Button, Link } from "@mui/material";

const ContactUs = () => {
  return (
    <Box py={6} px={3}>
      <Grid container spacing={4}>
        {/* Contact Info */}
        <Grid item xs={12} md={6}>
          <Typography variant="h4" gutterBottom>
            Contact Info
          </Typography>
          <Typography mb={3}>
            Tortor dignissim convallis aenean et tortor at risus viverra adipiscing.
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">Office</Typography>
              <Typography>730 Glenstone Ave 65802, Springfield, US</Typography>
              <Typography>
                <Link href="#">+123 987 321</Link>
              </Typography>
              <Typography>
                <Link href="#">+123 123 654</Link>
              </Typography>
              <Typography>
                <Link href="#">info@yourinfo.com</Link>
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">Management</Typography>
              <Typography>730 Glenstone Ave 65802, Springfield, US</Typography>
              <Typography>
                <Link href="#">+123 987 321</Link>
              </Typography>
              <Typography>
                <Link href="#">+123 123 654</Link>
              </Typography>
              <Typography>
                <Link href="#">info@yourinfo.com</Link>
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        {/* Contact Form */}
        <Grid item xs={12} md={6}>
          <Typography variant="h4" gutterBottom>
            Any Questions?
          </Typography>
          <Typography mb={3}>Use the form below to get in touch with us.</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Your Name" required />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Your Email" required />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Phone Number" />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Subject" />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth multiline rows={4} label="Message" required />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="primary" fullWidth>
                Submit
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

const OurStores = () => {
  const stores = [
    { country: "USA", address: "730 Glenstone Ave 65802, US", phone: "+123 666 777 88" },
    { country: "France", address: "13 Rue Montmartre 75001, Paris, France", phone: "+123 222 333 44" },
    { country: "Canada", address: "730 Glenstone Ave 65802, US", phone: "+123 666 777 88" },
    { country: "China", address: "13 Rue Montmartre 75001, Paris, France", phone: "+123 222 333 44" },
  ];
  return (
    <Box py={6} px={3}>
      <Grid container spacing={4} alignItems="center">
        <Grid item xs={12} md={6}>
          <Box component="img" src="/demo/images/single-image2.jpg" width="100%" borderRadius={2} />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h4" gutterBottom>
            Our Stores
          </Typography>
          <Typography mb={3}>You can also directly buy products from our stores.</Typography>
          <Grid container spacing={3}>
            {stores.map((store, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <Typography variant="h6">{store.country}</Typography>
                <Typography>{store.address}</Typography>
                <Typography>
                  <Link href="#">{store.phone}</Link>
                </Typography>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

const ContactPage = () => {
  return (
    <>
      <ContactUs />
      <OurStores />
    </>
  );
};

export default ContactPage;
