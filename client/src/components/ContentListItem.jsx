import React from 'react';

class ContentListItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="content-item">
        Score   Username    Timestamp
        Buttons Message    # Comments  
        <div className="comment">
          Comment Comment
        </div>
      </div>
    )
  }
}
