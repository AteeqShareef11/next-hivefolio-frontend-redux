import { useRef } from 'react';
import { IonSlides, IonSlide, IonContent, IonButton } from '@ionic/react';

// Optional parameters to pass to the swiper instance.
// See http://idangero.us/swiper/api/ for valid options.
const slideOpts = {
  initialSlide: 0,
  speed: 400,
  autoHeight: true,
  setWrapperSize: true,
  loop: false,
  breakpoints: {
    // when window width is >= 320px
    320: {
      slidesPerView: 2,
      spaceBetween: 20
    },
    // when window width is >= 480px
    480: {
      slidesPerView: 3,
      spaceBetween: 30
    },
    // when window width is >= 640px
    640: {
      slidesPerView: 3,
      spaceBetween: 16
    },
    // when window width is >= 1008px
    1008: {
        slidesPerView: 6,
        spaceBetween: 40
      }
  }

};


const SlidesCards = (props) => {
    const mySlides = useRef(null);

    /* const onBtnClicked = async (direction: string) => {
        const swiper = await mySlides.current.getSwiper();
        if( direction === 'next') {
            swiper.slideNext();
        } else if (direction === 'prev') {
            swiper.slidePrev();
        }   
    }; */

    return (
        <IonContent className="h-100">
            <IonSlides
                className="mt-6 pb-6 h-120 grid" 
                pager={false} 
                options={slideOpts} 
                ref={mySlides}
            >
            <IonSlide>
                <div className="mr-4 h-8">{props.children[0]}</div>
            </IonSlide>
            <IonSlide>
                <div className="mr-4">{props.children[1]}</div>
            </IonSlide>
            <IonSlide>
                <div className="mr-4">{props.children[2]}</div>
            </IonSlide>
            <IonSlide>
                <div className="mr-4">{props.children[3]}</div>
            </IonSlide>
            <IonSlide>
                <div className="mr-4">{props.children[4]}</div>
            </IonSlide>
            <IonSlide>
                <div className="mr-4">{props.children[5]}</div>
            </IonSlide>
            <IonSlide>
                <div className="mr-4">{props.children[6]}</div>
            </IonSlide>
            </IonSlides>

            <div className="flex flex-row-reverse pt-4">
                <IonButton 
                    /* disabled={mySlides.current?.isEnd} */
                    onClick={() => onBtnClicked('next')}>
                    Next
                </IonButton>
                <IonButton 
                    /* disabled={mySlides.current?.isBeginning} */
                    onClick={() => onBtnClicked('prev')}>
                    Previous
                </IonButton>
            </div>
           
        </IonContent>
    );
};

export default SlidesCards