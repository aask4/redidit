import React from 'react';
import ContentListItem from './ContentListItem';

class ContentList extends React.Component {
  contructor(props) {
    super(props);
  }

  render() {
    reutrn (
      <div className="content-list">
        This is the ContentList Component.
      </div>
    )
  }
}

export default ContentList;
