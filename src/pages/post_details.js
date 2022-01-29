import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Container from '@mui/material/Container';
import AlertMessage from './../styledComponents/alert.js';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { pink } from '@mui/material/colors';
import Divider from '@mui/material/Divider';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';

function Post_details() {

    const [message, setMessage] = useState();
    const [post, setPost] = useState({});
    const { id } = useParams();

    useEffect(() => {

        fetch(`http://localhost:3001/post/postDetails/${id}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(data => data.json())
            .then(data => {
                if (data.status === true) {
                    setPost(data.post);
                } else {
                    setMessage(data);
                }
            })
            .catch(err => console.log(err))

    }, []);

    //body image
    document.body.style = `background-color: #212121`;

    function simplifyDate(date){
        const index = date.indexOf('T');
        return date.substr(0, index);
    }

    const msg = message && <p>{message.message}</p>

    const images = post.PostImages && post.PostImages.map((image, index) => <div key={ index }>
        <img style={{width:"300px",height: "300px"}} name={image.name} src={ `http://localhost:3001/post_images/${image.name}` } />
        <a style={{display: "block"}} href={`http://localhost:3001/post_images/${image.name}`} >
            {image.name}
        </a>
    </div>
    );

    const materialImages = post.PostImages && <ImageList sx={{ width: '100%' }} cols={2}>
        {post.PostImages.map((item) => (
            <a key={ item.name } href={`http://localhost:3001/post_images/${item.name}`} >
                <ImageListItem key={item.name}>
                <img
                    src={`http://localhost:3001/post_images/${item.name}`}
                    alt={item.name}
                    loading="lazy"
                />
            </ImageListItem>
            </a>
        ))}
    </ImageList>

    //keep paragraphs
    var formatText = post.text && post.text.split('\n').map((text, index) => <p key={ index }>
        {text}
    </p>
    );

    const data = <Box>
        <Typography variant="h1" component="div" sx={{ color: 'white', textAlign: 'center' }} gutterBottom>{post.theme}</Typography>
        <Typography component="div" sx={{ color: 'white',textAlign: 'right' }}>{post.createdAt && simplifyDate(post.createdAt)}</Typography>
        <Divider  sx={{ borderColor: 'white' }} />
        <Typography component="div" sx={{ color: 'white', textAlign: 'left', marginTop: '2%' }}>{formatText}</Typography>
        { materialImages }
    </Box>

    return (
        <Container maxWidth="lg" sx={{ backgroundColor: '#333333', borderRadius: '15px', paddingBottom: '0.5%'}}>

            <Box sx={{marginTop: '1%'}}>
                {message && <AlertMessage message={message.message} />}
                { data }
        </Box>

        </Container>
        );
}

export default Post_details;