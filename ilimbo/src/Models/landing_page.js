import React, { Component } from 'react'
import './styles/landing_navbar.css'
import LandingHeader from './landing_header'
import About from './about'
import InfiniteScroll from 'react-infinite-scroller';


class Landing extends Component {
  render() {
    return (
      <div>
        <section id="intro"></section>
        <LandingHeader />
        <section id='about'> <About /> </section>
        <section id='article' className="landing-article">
          <h2>Article:</h2>
          <p>placeholder for comment box</p>
          <p>placeholder for comment box</p>
          <p>placeholder for comment box</p>
          <p>placeholder for comment box</p>
          <p>placeholder for comment box</p>
          <p>placeholder for comment box</p>
          <p>placeholder for comment box</p>
          <p>placeholder for comment box</p>
          <p>placeholder for comment box</p>
          <p>placeholder for comment box</p>
          <p>placeholder for comment box</p>
          <p>placeholder for comment box</p>
          <p>placeholder for comment box</p>
          {/* <InfiniteScroll
            pageStart={0}
            loadMore={loadFunc}
            hasMore={true || false}
            loader={<div className="loader" key={0}>Loading ...</div>}
          >
            {items}
          </InfiniteScroll> */}
        </section>
      </div>
    )
  }
}

export default Landing;
