import List from '@mui/material/List'
import Blog from './Blog'
import { Link } from 'react-router-dom'
import ListItemButton from '@mui/material/ListItemButton'
import Box from '@mui/material/Box'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'

const Blogs = ({ blogs }) => {


    return (
        <>
            <Box>
                <Typography variant="h5">BLOGS</Typography>
                <List>
                    {blogs.map(b => {

                        return (
                            <>
                                <ListItem>
                                    <ListItemButton component={Link} to={`/blogs/${b.id}`}>
                                        <ListItemText primary={b.title}/>
                                    </ListItemButton>
                                </ListItem>
                                <Divider/>
                            </>
                        )
                    })}

                </List>
            </Box>


            {/* <h2>Blogs</h2>
            {blogs.map(blog =>
                <p key={blog.id} style={blogStyle}>
                    <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                </p>

             <Blog key={blog.id} blog={blog} handleLike={() => handleLike(blog)} user={user} />
            )} */}
        </>
    )

}

export default Blogs