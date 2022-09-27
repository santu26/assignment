import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card } from "react-bootstrap";
import { FaGreaterThan } from "react-icons/fa";
import _ from "lodash";

const pageSize = 10;

const Repos = () => {
  const [posts, setPosts] = useState([]);
  const [paginatedPosts, setPaginatedPosts] = useState();

  const getPost = () => {
    axios
      .get(
        "https://api.github.com/search/repositories?q=created:>2017-10-22&sort=stars&order=desc"
      )
      .then((res) => {
        // console.log(res);
        const myData = res.data.items;
        //console.log(myData);
        setPosts(myData);
        setPaginatedPosts(_(myData).slice(0).take(pageSize).value());
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getPost();
  }, []);

  const handleOnClick = () => {
    console.log("clicked");
  };

  const pageCount = posts ? Math.ceil(posts.length / pageSize) : 0;
  if (pageCount === 1) return null;
  const pages = _.range(1, pageCount + 1);

  return (
    <div>
      {posts.map((post, id) => {
        return (
          <div className="card mb-3" style={{ maxWidth: "800px" }} id={post.id}>
            <div className="row g-0">
              <div className="col-md-4">
                <img
                  src={post.owner.avatar_url}
                  className="img-fluid rounded-start"
                  alt="..."
                  style={{ padding: "20px" }}
                />
              </div>
              <div className="col-md-6">
                <div className="card-body">
                  <h5 className="card-title">{post.name}</h5>
                  <p className="card-title">{post.description}</p>

                  <div className="hstack gap-3">
                    <div className="bg-light border">
                      {post.stargazers_count}
                    </div>
                    <div className="bg-light border">{post.open_issues}</div>
                    <p className="card-text">
                      <small className="text-muted">
                        Last pushed {post.updated_at} by {post.owner.login}
                      </small>
                    </p>
                  </div>
                  <button
                    onClick={handleOnClick}
                    style={{
                      border: "none",
                      marginRight: "-600px",
                    }}
                  >
                    <FaGreaterThan size="2em" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
      <nav className="d-flex justify-content-center ">
        <ul className="pagination">
          {pages.map((page) => {
            return <li className="page-link">{page}</li>;
          })}
        </ul>
      </nav>
    </div>
  );
};

export default Repos;
