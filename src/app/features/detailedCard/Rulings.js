import React, { useState } from 'react'

import { Icon, Comment, Button } from 'semantic-ui-react'

const Rulings = (props) => {
  const [showRulings, setShowRulings] = useState(false)
  const { rulings } = props

  // console.log(rulings)
  if (rulings.data && rulings.data.length === 0) {
    return (
      <p>
        <Icon name="cube" color="grey" />
        There are no additionals rules for this card.
      </p>
    )
  }

  return (
    <Comment.Group size="small">
      <Comment.Text style={{ fontSize: '14px' }}>
        <Icon name="cube" color="grey" />
        Rulings represent Oracle rulings, Wizards of the Coast set release
        notes, or Scryfall notes for a particular card.
      </Comment.Text>
      <Button
        style={{ marginTop: '10px' }}
        size="mini"
        content={showRulings ? `Hide` : `Show`}
        color="teal"
        icon={showRulings ? 'up arrow' : 'down arrow'}
        labelPosition="right"
        onClick={() => setShowRulings(!showRulings)}
      />
      {showRulings &&
        rulings.data &&
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
