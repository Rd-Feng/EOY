import React, { Component } from "react";
import './styles/comment_box.css';
import SubCommentBox from './subcomment_box'


class SubCommentList extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  componentDidMount() {
    this.setState({
      sub_count: this.props.sub_count,
      comment_id: this.props.comment_id
    }, () => this.subCommentInfo());
  }
  subCommentInfo() {
    fetch('http://localhost:4000/subcomments/' + this.state.comment_id)
      .then(response => response.json())
      .then(response => {
        this.setState({ sub_comment_info: response.data });
      });
  }

  render() {
    let cards;
    if (this.state.sub_comment_info) {
      cards = this.state.sub_comment_info.map(d => {
        return (
          <SubCommentBox
            sub_count={this.state.sub_count}
            user_id={d.creator}
            text={d.text}
            created_at={d.created_at}
            likes={d.likes}
            sub_id={d.id}
          />
        )
      })
    }
    return (
      <div>
        {cards}
      </div>
    )
  }
}

export default SubCommentList;