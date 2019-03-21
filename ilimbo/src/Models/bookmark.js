import React, { Component } from "react";
import Homeheader from './home/header'
import './styles/bookmarks.css';
import { withRouter } from 'react-router-dom';

class Bookmark extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user_id: JSON.parse(localStorage.getItem("id_token")),
      bookmark: true
    }
  }

  componentDidMount() {
    let user_id = localStorage.getItem("id_token");
    let titles = [];
    if (this.props.location.pathname.split("/")[1] === 'profile') {
      user_id = this.props.match.params.user_id;
      this.setState({ bookmark: false })
    }
    let myHeaders = new Headers();
    myHeaders.append('pragma', 'no-cache');
    myHeaders.append('cache-control', 'no-cache');
    let myInit = {
      method: 'GET',
      headers: myHeaders,
    };
    fetch(process.env.REACT_APP_API + '/bookmarks/' + user_id, myInit)
      .then(response => response.json())
      .then(response => {
        this.setState({ bookmarks: response.data }, () => {
          this.state.bookmarks.forEach(bookmark => {
            fetch('https://hacker-news.firebaseio.com/v0/item/' + bookmark.item_id + '.json').then(res => res.json())
              .then(res => {
                let obj = { [bookmark.item_id]: res.title }
                titles.push(obj)
              })
              .then(_ => {
                this.setState({ title: titles })
              })
          })
        })
      })
  }
  removeBookmark(id) {
    fetch(process.env.REACT_APP_API + '/bookmark/remove', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "user_id": this.state.user_id,
        "item_id": id
      })
    })
      .then(res => res.json())
      .then(res => {
        console.log(res);
      })
  }
  linkHandler(id) {
    this.props.history.push('/history/' + id);
  }
  render() {
    let cards = [];
    if (this.state.title) {
      cards = this.state.title.map((bookmark, index) => {
        let id = Object.keys(bookmark)[0]
        if (this.state.bookmark === true) {
          return (
            <div className="bk-card" key={id}>
              <div className="bk-card-details">
                <h2 className="bk-card-head"> {bookmark[id]} </h2>
                <div className="bk-btn-group">
                <a className="bk-card-action-button" onClick={(e) => { this.removeBookmark(e.target.id); }} id={id} >REMOVE</a>
                <a href={process.env.REACT_APP_DOMAIN + "/history/" + id} className="bk-card-action-button">READ</a>
                </div>
              </div>
            </div>
          )
        }
        else {
          return (
            <a key={id} href={process.env.REACT_APP_DOMAIN + "/history/" + id} className="bk-card bookmark-card-read-button">
                <div className="bk-card-details">
                  <h2 className="bk-card-head"> {bookmark[id]} </h2>
                </div>
            </a>
          )
        }
      })
    }
    if (cards.length === 0) {
      cards =
        <div className="null-bookmark"> No bookmarks found </div>
    }
    let navbar = <div> </div>
    let bookmark_bg = ""
    if (this.state.bookmark) {
      navbar = <Homeheader />
      bookmark_bg = "bk_bg"
    }
    else{
      bookmark_bg = "bookmarkpageg"
    }
    return (
      <div className={bookmark_bg}>
        {navbar}
        <div className="bookmark-container">
          {cards}
        </div>
      </div>
    )
  }
}

export default withRouter(Bookmark);
