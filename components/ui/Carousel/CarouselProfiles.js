import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";


export default class CarouselProfiles extends Component {
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
      arrows: false,
      speed: 500,
      slidesToShow: 8,
      slidesToScroll: 2,
      responsive: [
        {
          breakpoint: 1008,
          settings: {
            slidesToShow: 5,
            slidesToScroll: 3,
            infinite: true,
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
            slidesToShow: 3,
            slidesToScroll: 2,
            infinite: true,
          }
        },
        {
          breakpoint: 320,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            infinite: true,
          }
        }
      ]
    };
    return (
      <div className="mb-20 mx-4 sm:-mt-16 md:-mt-16 lg:-mt-16 xl:-mt-16">
        <div className="grid grid-cols-1 gap-4">
          <h2 className="ml-4 ">{this.props.titleText}</h2>
          <Slider ref={c => (this.slider = c)} {...settings} className="carouselMaster">
            <div key={1}>
              <div className="mr-4">{this.props.children[0]}</div>
            </div>

            <div key={2}>
              <div className="mr-4">{this.props.children[1]}</div>
            </div>
            
            <div key={3}>
              <div className="mr-4">{this.props.children[2]}</div>
            </div>

            <div key={4}>
              <div className="mr-4">{this.props.children[3]}</div>
            </div>

            <div key={5}>
              <div className="mr-4">{this.props.children[4]}</div>
            </div>

            <div key={6}>
              <div className="mr-4">{this.props.children[5]}</div>
            </div>

            <div key={7}>
              <div className="mr-4">{this.props.children[6]}</div>
            </div>

            <div key={8}>
              <div className="mr-4">{this.props.children[7]}</div>
            </div>

            <div key={9}>
              <div className="mr-4">{this.props.children[8]}</div>
            </div>
            {/* <Link to="/players">
              <div key={10} className="bg-gray-400 h-20">
                <div>View more profiles</div>
              </div>
            </Link> */}
            
          </Slider>
          <div style={{ textAlign: "right" }} className="mr-4">
            <button className="rounded-3xl mr-4 py-4 px-4 bg-dark text-white hover:bg-primary hover:text-dark" onClick={this.previous}>
              Previous
            </button>
            <button className="rounded-3xl py-4 px-4 bg-dark text-white hover:bg-primary hover:text-dark" onClick={this.next}>
              Next
            </button>
          </div>
        </div>
      </div>
    );
  }
}