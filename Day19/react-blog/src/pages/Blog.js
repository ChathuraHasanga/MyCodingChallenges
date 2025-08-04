import React, {useState, useEffect} from "react";
import axios from "axios";

const Blog = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get("https://jsonplaceholder.typicode.com/posts")
            .then(response => {
                const formattedPosts = response.data.slice(0,16).map(post => ({
                    id: post.id,
                    title: post.title,
                    content: post.body,
                    published_date: new Date(Date.now() - Math.random() * 30*24*60*60*1000).toISOString().split('T')[0]

                }));
                setPosts(formattedPosts);
                setLoading(false);
            })
            .catch(err => {
                console.error('API Error:', err);
                const mockPosts = [
                    {
                        id: 1,
                        title: "Getting Started with React",
                        content : "React is a JavaScript library for building user interfaces. It allows developers to create large web applications that can change data, without reloading the page.",
                        published_date: "2023-10-01"
                    },
                    {
                        id: 2,
                        title: "Understanding Modern JavaScript",
                        content: "Modern JavaScript has evolved significantly with ES6+ features. Learn about arrow functions, destructuring, async/await, and other essential concepts for modern web development.",
                        published_date: "2024-01-20"
                    },
                    {
                        id: 3,
                        title: "Building Responsive Web Applications",
                        content: "Creating responsive web applications is crucial in today's mobile-first world. This post covers best practices for building applications that work seamlessly across all devices.",
                        published_date: "2024-01-25"
                    }
                ];
                setPosts(mockPosts);
                setLoading(false);
                setError(null);
            });
    }, []);

    if(loading) return(
        <div style={{textAlign: 'center', padding: '2rem'}}>
            <p style={{fontSize: '1.2rem', color: '#666'}}>Loading...</p>
        </div>
    );

    if(error && posts.length === 0) return(
        <div style={{textAlign: 'center', padding: '2rem'}}>
            <h2 style={{color: '#e74c3c'}}>Unable to load posts</h2>
            <p>Please check your internet connection and try again.</p>
        </div>
    );

    return(
        <div style={{
            maxWidth: '800px',
            margin: '0 auto',
            padding: '2rem',
            fontFamily: 'Arial, sans-serif',
        }}>
            <h1 style={{
                textAlign: 'center',
                color: '#1a64afff',
                marginBottom: '2rem',
                fontSize: '2.5rem'
            }}>
                Blog Site/ Blog Posts
            </h1>

            {posts.length === 0 ? (
                <div style={{textAlign: 'center', padding: '2rem'}}>
                    <p style={{fontSize:'1.1rem', color: '#7f8c8d'}}>No posts available.</p>
                </div>
            ) : (
                <div>
                {posts.map(post => (
                    <article key={post.id} style={{
                        borderBottom: '2px solid #78e172ff',
                        marginBottom: '2rem',
                        paddingBottom: '1.5rem',
                        transition: 'transform 0.2s ease',
                        cursor: 'pointer'
                    }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                    >
                        <h2 style={{
                                color: '#48a9e2ff',
                                marginBottom: '0.5rem',
                                fontSize: '1.5rem',
                                textTransform: 'capitalize',
                                lineHeight: '1.4'
                            }}>
                                {post.title}
                            </h2>
                            
                            <p style={{
                                color: '#5fdca2ff',
                                lineHeight: '1.6',
                                marginBottom: '1rem',
                                fontSize: '1rem'
                            }}>
                                {post.content}
                            </p>
                            
                            <small style={{
                                color: '#95a5a6',
                                fontSize: '0.9rem',
                                fontStyle: 'italic'
                            }}>
                                📅 Published on {new Date(post.published_date).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </small>
                    </article>
                ))}
                </div>
            )}
        </div>
    );
};

export default Blog;