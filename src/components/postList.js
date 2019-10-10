import React from 'react'
import { css } from '@emotion/core'
import { slugify } from '../utils/helpers'
import format from 'date-fns/format'
import { Link } from "gatsby"
import { BlogContext } from '../context/mainContext'
import getImageKey from '../utils/getImageKey'

function PostList ({
  posts, isAdmin, deletePost, publishPost, unPublishPost, context
}) {
  const { theme, theme: { highlight } } = context

  return (
    <div css={[postListContainer(isAdmin)]}>
      {posts.map(post => {
        const cover_image = `./downloads/${getImageKey(post.cover_image)}`
        const signed_image = post.signedImage
        const title = post.title
        let link = slugify(post.title)
        if (isAdmin) {
          link = `/editpost/${post.id}/${link}`
        }
        return (
          <div css={[postContainer(isAdmin)]} key={post.id}>
            {
              isAdmin && (
                <div css={[sideButtonContainer]}>
                  <p onClick={() => deletePost(post)} css={[sideButton(theme)]}>Delete</p>
                  {
                    post.published ? (
                      <p onClick={() => unPublishPost(post)} css={[sideButton(theme)]}>Unpublish</p>
                    ) : (
                      <p onClick={() => publishPost(post)} css={[publishButton(theme)]}>Publish</p>
                    )
                  }
                </div>
              )
            }
            <Link css={[linkStyle]} to={link}>
              <article >
                <div css={[postStyle(theme)]}>
                  <div css={postContentStyle}>
                    <div css={(coverImageContainer(isAdmin))}>
                      <div css={coverImage(isAdmin ? signed_image : cover_image)} />
                      {/* <img src={isAdmin ? signed_image : cover_image} css={coverImage(isAdmin)} /> */}
                    </div>
                    <header>
                      <h3 css={[titleStyle(theme, isAdmin)]}>
                        {title}
                      </h3>
                      <p css={[postDescription(theme)]}>{post.description}</p>
                      {
                        isAdmin && (
                          <div>
                            {
                              post.published ? (
                                <p css={[postDate(theme)]}>Published {format(new Date(post.createdAt), 'MMMM dd yyyy')}</p>
                              ) : (
                                <p css={[notPublishedStyle(theme)]}>Not Published</p>
                              )
                            }
                          </div>
                        )
                      }
                    </header>
                  </div>
                </div>
              </article>
            </Link>
          </div>
        )
      })}
    </div>
  )
}

export default function PostListWithContext(props) {
  return (
    <BlogContext.Consumer>
      {
        context => <PostList {...props} context={context} />
      }
    </BlogContext.Consumer>
  )
}

const postListContainer = isAdmin => css`
  display: ${isAdmin ? 'inline' : 'flex'};
  flex-wrap: wrap;
`

const coverImageContainer = isAdmin => css`
  height: ${isAdmin ? '250px' : '280px'};
  overflow: hidden;
  margin-bottom: 40px;
  text-align:center;
  position: relative;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 30px 60px -10px, rgba(0, 0, 0, 0.22) 0px 18px 36px -18px;
`

// const coverImage = (isAdmin) => css`
//   height: ${isAdmin ? '250px' : '280px'};
//   width: 100%;
//   height: 100%;
// `

const coverImage = (cover_image) => css`
  background-image: url("${cover_image}");
  background-size: cover;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-position: 50% 50%;
`

const notPublishedStyle = ({ fontFamily }) => css`
  font-family: ${fontFamily};
  margin: 10px 0px 0px;
  font-weight: 500;
  font-size: 14px;
  color: rgba(0, 0, 0, .3);
`

const sideButton = ({ fontFamily }) => css`
  font-family: ${fontFamily};
  font-size: 14px;
  opacity: .7;
  margin-bottom: 5px;
  cursor: pointer;
  &:hover {
    opacity: 1;
  }
`

const publishButton = (theme) => css`
  ${sideButton(theme)};
  color: ${theme.highlight};
`

const sideButtonContainer = css`
  min-width: 100px;
`

const postContainer = isAdmin => css`
  display: flex;
  width: ${isAdmin ? '100%': '570px'};
  margin: 20px;
`

const postDescription =  ({ baseFontWeight, secondaryFontColor, fontFamily }) => css`
  font-weight: ${baseFontWeight};
  color: ${secondaryFontColor};
  font-family: ${fontFamily};
  font-weight: 300;
  margin-top: 8px;
  font-size: 18px;
  line-height: 24px;
  margin-bottom: 6px;
`

const postDate = ({ fontFamily }) => css`
  color: rgba(0, 0, 0, .6);
  margin-bottom: 0px;
  font-size: 14px;
  font-family: ${fontFamily} !important;
`

const postStyle = ({ highlight }) => css`
  margin-bottom: 50px;
  border-bottom: 3px solid ${highlight};
`

const postContentStyle = css`
  margin: 10px auto 0px;
  padding: 10px 0px 20px;
`

const titleStyle = (theme, isAdmin) => css`
  font-size: ${isAdmin ? '20px': '32px'};
  line-height: ${isAdmin ? '30px' : '40px'};
  font-weight: ${isAdmin ? '600' : theme.baseFontWeight};
  margin: 5px 0px 10px;
  font-family: ${theme.scriptFamily};
  font-weight: 300;
  @media(max-width: 1000px) {
    font-size: 30px;
  }
`
const linkStyle = css`
  color: black;
  box-shadow: none;
  text-decoration: none;
`