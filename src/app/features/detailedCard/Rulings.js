import React from 'react'

import { Icon, Comment } from 'semantic-ui-react'

const Rulings = (props) => {
  const { rulings } = props

  return (
    <Comment.Group size="small">
      <Comment.Text style={{ fontSize: '14px' }}>
        <Icon name="cube" color="grey" />
        Rulings represent Oracle rulings, Wizards of the Coast set release
        notes, or Scryfall notes for a particular card.
      </Comment.Text>
      {rulings.data &&
        rulings.data.map((comment, index) => {
          return (
            <Comment key={index}>
              <Comment.Avatar src="/images/pngegg.png" />
              <Comment.Content>
                <Comment.Author>
                  <Icon name="users" color="grey" />
                  {comment.source}
                  <Comment.Metadata>
                    <Icon name="calendar" color="grey" />
                    {comment.published_at}
                  </Comment.Metadata>
                </Comment.Author>

                <Comment.Text>{comment.comment}</Comment.Text>
              </Comment.Content>
            </Comment>
          )
        })}
    </Comment.Group>
  )
}

export default Rulings
