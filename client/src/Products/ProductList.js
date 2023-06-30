import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

import productimg1 from '../assest/pexels-jane-doan-1099680.jpg';
import productimg2 from '../assest/pexels-chan-walrus-958545.jpg';
import productimg3 from '../assest/pexels-julie-aagaard-2097090.jpg';
import productimg4 from '../assest/pexels-rajesh-tp-1624487.jpg';
import Productimges from '../Products/Productimg.module.css';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const StyledImage = styled('img')({
  marginBottom: '10px',
  borderRadius: '50%',
  width: '100px', // Adjust the size according to your preference
  height: '100px', // Adjust the size according to your preference
});


const StyledParagraph = styled('p')({
  fontSize: '14px',
  fontWeight: 'bold',
});

const StyledH1 = styled('h1')({
  fontSize: '24px',
  fontWeight: 'bold',
  color: '#333',
});



export default function BasicGrid() {
  return (
    <div>
      <StyledH1 className={Productimges.productcatgorytext}>Inspiration for your first order</StyledH1>

      <Grid container spacing={2}>
        <Grid item xs={6} sm={3}>
          <Item>
            <StyledImage
              className={Productimges.catgoryimg}
              src={productimg1}
              alt="Product Image1"
            />
            <StyledParagraph>Veg Raita</StyledParagraph>
          </Item>
        </Grid>

        <Grid item xs={6} sm={3}>
          <Item>
            <StyledImage
              className={Productimges.catgoryimg}
              src={productimg2}
              alt="Product Image2"
            />
            <StyledParagraph>Veg Raita</StyledParagraph>
          </Item>
        </Grid>

        <Grid item xs={6} sm={3}>
          <Item>
            <StyledImage
              className={Productimges.catgoryimg}
              src={productimg3}
              alt="Product Image3"
            />
            <StyledParagraph>Veg Raita</StyledParagraph>
          </Item>
        </Grid>

        <Grid item xs={6} sm={3}>
          <Item>
            <StyledImage
              className={Productimges.catgoryimg}
              src={productimg4}
              alt="Product Image4"
            />
            <StyledParagraph>Veg Raita</StyledParagraph>
          </Item>
        </Grid>
      </Grid>

      <br />
      <StyledH1 className={Productimges.productcatgorytext}>Product List</StyledH1>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={6} sm={4} md={3} lg={2}>
            <Item>
              <img
                className={Productimges.imges}
                src={productimg2}
                alt="Product Image7"
              />
              <p>dfg</p>
            </Item>
          </Grid>

          <Grid item xs={6} sm={4} md={3} lg={2}>
            <Item>
              <img
                className={Productimges.imges}
                src={productimg1}
                alt="Product Image8"
              />
              <h3>Veg Raita</h3>
            </Item>
          </Grid>

          <Grid item xs={6} sm={4} md={3} lg={2}>
            <Item>
              <img
                className={Productimges.imges}
                src={productimg2}
                alt="Product Image9"
              />
              <p>dfg</p>
            </Item>
          </Grid>

          <Grid item xs={6} sm={4} md={3} lg={2}>
            <Item>
              <img
                className={Productimges.imges}
                src={productimg3}
                alt="Product Image10"
              />
              <p>dfg</p>
            </Item>
          </Grid>

          <Grid item xs={6} sm={4} md={3} lg={2}>
            <Item>
              <img
                className={Productimges.imges}
                src={productimg4}
                alt="Product Image11"
              />
              <h3>Butter Chicken</h3>
            </Item>
          </Grid>

          <Grid item xs={6} sm={4} md={3} lg={2}>
            <Item>
              <img
                className={Productimges.imges}
                src={productimg1}
                alt="Product Image12"
              />
              <p>dfg</p>
            </Item>
          </Grid>

          <Grid item xs={6} sm={4} md={3} lg={2}>
            <Item>
              <img
                className={Productimges.imges}
                src={productimg4}
                alt="Product Image13"
              />
              <h3>Butter Chicken</h3>
            </Item>
          </Grid>

          <Grid item xs={6} sm={4} md={3} lg={2}>
            <Item>
              <img
                className={Productimges.imges}
                src={productimg2}
                alt="Product Image14"
              />
              <h3>Butter Chicken</h3>
            </Item>
          </Grid>

          {/* Continue with the rest of your Grid items */}
        </Grid>
      </Box>
    </div>
  );
}
