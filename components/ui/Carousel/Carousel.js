import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


export default class Carousel extends Component {
  constructor(props) {
    super(props);
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
  }
  next() {
    this.slider.slickNext();
  }
  previous() {
    this.slider.slickPrev();
  }
  render() {

    const settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 6,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1008,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: false,
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 2,
            initialSlide: 2
          }
        },
        {
          breakpoint: 599,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1
          }
        }
      ]
    };
    return (
      <div className="slick-slider carouselMaster max-width">
        <h2>{this.props.titleText}</h2>
        <Slider ref={c => (this.slider = c)} {...settings} className="slick-slider">
          <div key={1} >
            <div className="carouselMargin">{this.props.children[0]}</div>
          </div>

          <div key={2}>
            <div className="carouselMargin">{this.props.children[1]}</div>
          </div>
          
          <div key={3}>
            <div className="carouselMargin">{this.props.children[2]}</div>
          </div>

          <div key={4}>
            <div className="carouselMargin">{this.props.children[3]}</div>
          </div>

          <div key={5}>
            <div className="carouselMargin">{this.props.children[4]}</div>
          </div>

          <div key={6}>
            <div>{this.props.children[5]}</div>
          </div>
        </Slider>
        <div style={{ textAlign: "center" }}>
          <button className="button" onClick={this.previous}>
            Previous
          </button>
          <button className="button" onClick={this.next}>
            Next
          </button>
        </div>
      </div>
    );
  }
}