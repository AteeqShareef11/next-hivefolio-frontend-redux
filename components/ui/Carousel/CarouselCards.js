import React, { Component } from "react";
import { Link } from 'react-router-dom';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
export default class CarouselCards extends Component {
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
      infinite: this.props.infinite,
      arrows: false,
      speed: 500,
      breakpoint: this.props.xl,
      slidesToShow: this.props.xlItems,
      slidesToScroll: this.props.xlScroll,
      responsive: [
        /* {
          breakpoint: 1008,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: false,
          }
        }, */
        /* {
          breakpoint: this.props.xl,
          settings: {
            slidesToShow: this.props.xlItems,
            slidesToScroll: this.props.xlScroll,
            infinite: this.props.xlInfinite,
          }
        }, */
        {
          breakpoint: this.props.lg,
          settings: {
            slidesToShow: this.props.lgItems,
            slidesToScroll: this.props.lgScroll,
            infinite: this.props.lgInfinite,
          }
        },
        {
          breakpoint: this.props.md,
          settings: {
            slidesToShow: this.props.mdItems,
            slidesToScroll: this.props.mdScroll,
            infinite: this.props.mdInfinite,
          }
        },
        {
          breakpoint: this.props.sm,
          settings: {
            slidesToShow: this.props.smItems,
            slidesToScroll: this.props.smScroll,
            infinite: this.props.smInfinite,
          }
        },
        {
          breakpoint: this.props.xs,
          settings: {
            slidesToShow: this.props.xsItems,
            slidesToScroll: this.props.xsScroll,
            infinite: this.props.xsInfinite,
          }
        },
        /* {
          breakpoint: 600,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 2,
            initialSlide: 2
          }
        }, */
        /* {
          breakpoint: 599,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1
          }
        } */
      ]
    };
  
    return (
      <div className="mb-12 mx-4">
        <div className="grid grid-cols-1 gap-4">
          <h2 className="mb-2">{this.props.titleText}</h2>
          <Slider ref={c => (this.slider = c)} {...settings} 
          className="carouselMaster">

            {this.props.children && Array.isArray(this.props.children) && (
              <div key={1} className="">
                <div className="mr-4 h-fit">{this.props.children[0]}</div>
              </div>
            )}

            {this.props.children && Array.isArray(this.props.children) && (
              <div key={2}>
                <div className="mr-4">{this.props.children[1]}</div>
              </div>
            )}

            {this.props.children && Array.isArray(this.props.children) && (
              <div key={3}>
                <div className="mr-4">{this.props.children[2]}</div>
              </div>
            )}    

            {this.props.children && Array.isArray(this.props.children) && (
              <div key={4}>
                <div className="mr-4">{this.props.children[3]}</div>
              </div>
            )}

            {this.props.children && Array.isArray(this.props.children) && (
              <div key={5}>
                <div className="mr-4">{this.props.children[4]}</div>
              </div>
            )}

            {this.props.children && Array.isArray(this.props.children) && (
              <div key={6}>
                <div className="mr-4">{this.props.children[5]}</div>
              </div>
            )}

            {this.props.link && (
              <Link to={this.props.link}>
                <div key={7} className="bg-primary hover:bg-light rounded-3xl h-full ">
                  <div className="flex justify-center items-center h-44 p-8">
                    <h5 className="text-center">View more {this.props.linktext}</h5>
                  </div>
                </div>
              </Link>
            )}
            
            
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