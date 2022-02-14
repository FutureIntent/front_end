import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import LastPageIcon from '@mui/icons-material/LastPage';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import SubmitButton from './../styledComponents/submitButton.js';
import { pink } from '@mui/material/colors';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

function Home() {

    const isAdmin = useSelector((state) => state.loginStatus.admin);

    //get URL query params
    const queryParams = new URLSearchParams(window.location.search);
    let page = queryParams.get('page');
    let limit = queryParams.get('limit');

    if (!page) page = 1;
    if (!limit) limit = 4;

    //initialize fetching states
    const [post, setPost] = useState([]);
    const [pagening, setPagening] = useState({});
    const [confirmation, setConfirmation] = useState();

    //fetch posts once
    useEffect(() => {

        fetch(`http://localhost:3001/post/postPreviews?page=${page}&limit=${limit}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(data => data.json())
            .then(data => { setPost(data.results); setPagening(data); })
            .catch(err => console.log(err))

    }, []);

    //body image
    document.body.style = `width: 100%;
    min-height: 100vh;
    background-image: linear-gradient(to right, rgba(0,0,0, 0.3) 0 100%),url("https://images5.alphacoders.com/764/thumb-1920-764519.jpg");
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;`;

    //view confirmation interface
    function handleConfirmation(event) {

        const post_id = event.target.name;
        setConfirmation(post_id);
 
    }

    //confirm deletion
    function handleDeletion(event) {

        const decision = event.target.value;

        decision == "false" ? setConfirmation() :
        fetch(`http://localhost:3001/post/deletePost/${confirmation}`, {
                method: "DELETE",
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(data => data.json())
                .then(data => { alert(data.message); setTimeout(() => { window.location.reload() }, 1000) })
                .catch(err => console.log(err))
    }

    //display confimation interface
    const deletion = <Box>

        <p>
        Delete Post?
        </p>
        
        <Stack direction="row" spacing={2} sx={{justifyContent: 'center', marginBottom: '5%'}}>
           <SubmitButton value={true} onClick={handleDeletion}> Yes </SubmitButton>
           <SubmitButton value={false} onClick={handleDeletion}> No </SubmitButton>
        </Stack>
        

    </Box>

    //iterate every post and display previews
    const postPreview = post && post.map((post, index) => <Grid item xs={6} key={index} sx={{display: 'flex',flexDirection: 'column', alignItems: 'center'}}>
        <Card sx={{ maxWidth: 400,minWidth: 400, minHeight: 300, backgroundColor: '#212121', color: 'white', textAlign: 'center'}}>
            <CardActionArea>
                <Link to={`post/${post.id}`} style={{ textDecoration: 'none', color: "inherit" }}>
                    {post.PostImages.length > 0 ? <CardMedia
                        sx={{ objectFit: 'fill'}}
                    component="img"
                    height="250"
                    image={`http://localhost:3001/post_images/${post.PostImages[0].name}`}
                    alt="preview"
                    /> :
                        <CardMedia
                            component="img"
                            height="250"
                            image="212121.png"
                            alt="preview"
                        />   }
                <CardContent>
                    <Typography variant="h5" component="div">
                        {post.theme}
                    </Typography>
                </CardContent>

                </Link>
            </CardActionArea>

            {isAdmin && <p>
                <SubmitButton name={post.id} onClick={handleConfirmation}>
                    Delete Post
                </SubmitButton>
                </p>
                }       

            {confirmation == post.id && deletion}

        </Card>
    </Grid>

    );

    //display pagening buttons
    const pages = <Box sx={{margin: 'auto', display: 'flex', flexDirection: 'row', width: '40%', justifyContent: 'space-evenly', marginTop: '5%'}}>
        
            {pagening.pageCount && <a href={`/?page=1&limit=${limit}`} style={{ textDecoration: 'none', color: "inherit" }}><IconButton name="start"><FirstPageIcon fontSize='large' sx={{ color: pink[500]}}/></IconButton></a>}
        {pagening.previous && <a href={`/?page=${parseInt(page) - parseInt(1)}&limit=${limit}`} style={{ textDecoration: 'none', color: "inherit", display: 'flex', alignItems: 'center' }}><SubmitButton name="prev" size="small" >{pagening.previous.page}</SubmitButton></a>}
            {pagening.current && <a style={{ textDecoration: 'none', color: "inherit", display: 'flex', alignItems:'center' }}><SubmitButton name="current" size="small" sx={{backgroundColor: pink[500], margin: 'auto'}} >{pagening.current.page} </SubmitButton> </a>}
        {pagening.next && <a href={`/?page=${parseInt(page) + parseInt(1)}&limit=${limit}`} style={{ textDecoration: 'none', color: "inherit", display: 'flex', alignItems: 'center' }}><SubmitButton name="next" size="small"  >{pagening.next.page}</SubmitButton></a>}
            {pagening.pageCount && <a href={`/?page=${pagening.pageCount.count}&limit=${limit}`} style={{ textDecoration: 'none', color: "inherit" }}><IconButton name="end"><LastPageIcon fontSize='large' sx={{ color: pink[500] }} /></IconButton></a>}
        
    </Box>

    function testing() {
        console.log(pagening);
    }

    return (

        <Container maxWidth='md' sx={{minHeight: '110vh'}}>

            <Box sx={{ flexGrow: 1 , marginTop: '5%'}}>
                <Grid container spacing={8} justifyContent='center' columns={{ xs: 4, sm: 8, md: 12 }}>
                    {postPreview}
                </Grid>
            </Box>

            {pages}

        </Container>

        );
}
export default Home;