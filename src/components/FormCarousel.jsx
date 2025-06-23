import { useEffect, useRef } from 'react'
import sample_img_1 from '../assets/sample_img_1.jpg'
import sample_img_2 from '../assets/sample_img_2.jpg'
import sample_img_3 from '../assets/sample_img_3.jpg'

function FormCarousel({ className, ...props }) {
    const carouselTrackRef = useRef();
    const carouselRef = useRef();

    function startCarouselAutoPlay() {
        let carouselWitdh = carouselRef.current.getBoundingClientRect().width;
        let numberOfElements = carouselTrackRef.current.childElementCount;
        let initialCount = 0;

        setInterval( function(){
            
            if ( initialCount <= numberOfElements ) {
            carouselTrackRef.current.style.transform = `translateX(-${ initialCount * carouselWitdh }px)`

            if ( initialCount == numberOfElements - 1 ) {
                initialCount = 0;
            } else {
                initialCount += 1;
            }
            }
        }, 8000 )

    }
    
    useEffect( function() {
        startCarouselAutoPlay()
    }, [])
    
  return (
    <div className={`form--carousel ${ className }`} ref={ carouselRef } { ...props }>
        <div className="form--carousel__track" ref={ carouselTrackRef }>
          <div className="form--carousel__item">
            <img src={ sample_img_1 } alt="image of a meeting" className="form--carousel__item-image" />

            <div className="form--carousel__item-text">
              get the latest weather updates
            </div>
          </div>

          <div className="form--carousel__item">
            <img src={ sample_img_2 } alt="image of a meeting" className="form--carousel__item-image" />

            <div className="form--carousel__item-text">
              search you daily commute
            </div>
          </div>

          <div className="form--carousel__item">
            <img src={ sample_img_3 } alt="image of a meeting" className="form--carousel__item-image" />

            <div className="form--carousel__item-text">
              dont be caught unaware
            </div>
          </div>
        </div>
      </div>
  )
}

export default FormCarousel
