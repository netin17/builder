"use client";
// src/app/[builder]/index.tsx
import { Swiper, SwiperSlide } from 'swiper/react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import Image from 'next/image'
import { useGetBuilderQuery } from '@/lib/redux/services/builderApi';
import { useRouter } from 'next/router'; // Import the useRouter hook
import Link from 'next/link'
// Import Swiper styles
import 'swiper/css';

const BuilderPage = ({params}:{params: {builder:string}}) => {
  const builderSlug = params.builder; // Get the builder value

  // Create an object with a 'slug' property
  const queryObject = { slug: builderSlug };
  const { isLoading, isFetching, data, error } = useGetBuilderQuery(queryObject);
  
  function AbbreviateLongName({fullName, maxLength}: { fullName: string; maxLength: number }) {
    if (fullName.length <= maxLength) {
      return <span>{fullName}</span>;
    }
  
    const abbreviatedName = `${fullName.substring(0, maxLength - 3)}...`;
  
    return <span title={fullName}>{abbreviatedName}</span>;
  }
  function formatPrice(price:number) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'INR',
    }).format(price);
  }
  

  return (
    <main>
        <Navbar expand="lg" className="bg-body-tertiary custom-nav">
          <Container>
            <Navbar.Brand href={process.env.NEXT_PUBLIC_BASE_LIVE_URL} target='_blank'><Image src="/logo.png" width={134} height={63} alt='logo-image' priority/></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto">
                <Nav.Link href={process.env.NEXT_PUBLIC_BASE_LIVE_URL+`list`} target='_blank'>Local Properties</Nav.Link>
                <Nav.Link href="#">Explore Our Builders</Nav.Link>
                <Nav.Link href={process.env.NEXT_PUBLIC_BASE_LIVE_URL+`signin`} target='_blank' className='active'>Post Property Free</Nav.Link>
              </Nav>
              <Nav className="ms-auto">
                <Nav.Link className='create-profile-btn' href={process.env.NEXT_PUBLIC_BASE_LIVE_URL+`frontuser/property`} target='_blank'>Create Your Builder Profile</Nav.Link>
                <Nav.Link className='login-btn'  href={process.env.NEXT_PUBLIC_BASE_LIVE_URL+`frontuser/property`} target='_blank'>Login</Nav.Link>
            </Nav>
            </Navbar.Collapse>
            
          </Container>
        </Navbar>
{error ? (
  <p>Oh no, there was an error</p>
): isLoading || isFetching ? (
  <p>Loading...</p>
): data ? (
  <>
  
    <div>
    <section className='banner-main'>
            <div className='container'>
                <div className='row d-flex align-items-center'>
                    <div className='col-12 col-md-6'>
                      <div className='logo-container'>
                      <img
  src={process.env.NEXT_PUBLIC_BASE_LIVE_URL + `storage/${data?.msg?.builder?.details?.company_logo}`}
  width={100}
  height={100}
  alt="Banner Image"
/>
                      </div>
                        <div className='banner-container'>
                            <h1>{
                              data?.msg?.builder?.company_name.charAt(0).toUpperCase() + data?.msg?.builder?.company_name.slice(1)
                            }</h1>
                           <div dangerouslySetInnerHTML={{ __html: data?.msg?.builder?.details?.description }} />
                            {data?.msg?.builder?.details?.portfolio && 
                            <a href={data?.msg?.builder?.details?.portfolio} target='_blank'>
                            <Image  src="/play.svg" alt="Vercel Logo" className="dark:invert" width={24} height={24} priority />
                            Play Portfolio
                            </a>
                            }
                            

                        </div>
                    </div>
                    <div className='col-12 col-md-6'>
                        <div className='banner-image-outer'>
                          <div className='banner-image'>
                           
<img
  src={process.env.NEXT_PUBLIC_BASE_LIVE_URL + `storage/${data?.msg?.builder?.details?.banner_image}`}
  
  alt="Banner Image"
/>
                          </div>
                          <div className='flexable-living'>
                            <span><img src={'/icon-park-solid_building-two.svg'} alt="Vercel Logo" /></span>
                            <div className='flexable-living-con'>
                              <p>Flexible Living</p>
                              <h6>{data?.msg?.builder?.details?.total_flexible_living} Properties</h6>
                            </div>
                          </div>
                          <div className='high-demands'>
                            High Demands
                          </div>
                          <div className='ongoing-project'>
                            <h4>{data?.msg?.builder?.details?.running_projects}</h4>
                            <span>ONGOING PROJECTS</span>
                          </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section className='quote-sec'>
          <div className='container'>
          <h2>We offer a variety of <img src={'/quote2.svg'} alt="Vercel Logo" /> properties, including houses, 
                  apartments, and land <img src={'/quote1.svg'} alt="Vercel Logo" /> also, provide personalized service.</h2>
          </div>
        </section>

        <section className='services-sec py-3 py-md-5'>
          <div className='container'>
            <div className='row'>
              <div className='col-12 col-md-8 m-auto'>
                <h4 className='service-title text-center'>We are experienced architectural con-sultans who can make 
                your dreams come true, make building with new styles and modern one and better 
                functionality.</h4>
              </div>
            </div>
            <div className='row g-3'>
              <div className='col-12 col-md-4'>
                <div className='service-box'>
                  <div className='service-box-img'>
                    <img src={'/architectural-services.svg'} alt="Vercel Logo" />
                  </div>
                  <div className='service-box-con'>
                    <h5>Architectural Services</h5>
                    <p>Architects take the conceptual design and begin to develop it into a more 
                      detailed and refined design</p>
                  </div>
                </div>
              </div>

              <div className='col-12 col-md-4'>
                <div className='service-box'>
                  <div className='service-box-img'>
                    <img src={'/contract-negotiation.svg'} alt="Vercel Logo" />
                  </div>
                  <div className='service-box-con'>
                    <h5>Contract Negotiation</h5>
                    <p>Before entering into contract negotiations, it is important to have a 
                      clear understanding of your goals</p>
                  </div>
                </div>
              </div>

              <div className='col-12 col-md-4'>
                <div className='service-box'>
                  <div className='service-box-img'>
                    <img src={'/environmental-graphics.svg'} alt="Vercel Logo" />
                  </div>
                  <div className='service-box-con'>
                    <h5>Environmental Graphics</h5>
                    <p>Environmental graphics can be used to create establish identity, and 
                      define different areas</p>
                  </div>
                </div>
              </div>
            </div>


          {/* Get Your Best Collection On Sale */}

            <div className='best-collection mt-4 mt-md-5'>
              <div className='best-collection-header'>
                <div className='row'>
                  <div className='col-12 col-md-4'>
                    <h3>Get Your Best Collection On Sale</h3>
                  </div>
                  <div className='col-12 col-md-4 ms-auto'>
                    <p>Get your dream place that is popular right now, and get the sale of this year</p>
                    <div className='text-center text-md-end'><a href='#'>View All</a></div>
                  </div>
                </div>
              </div>

              <ul>
                {data?.msg?.builder?.cards?.map((card:any)=>{
                  return(
                    <li key={card?.id}>
                    <img src={process.env.NEXT_PUBLIC_BASE_LIVE_URL+`storage/${card?.card?.thumbnail}`} alt="Vercel Logo" />
                    <span><i>{card?.city?.name}</i></span>
                  </li>
                  )
                })}
               
                {/* <li>
                  <img src={'/mumbai.jpeg'} />
                  <span><i>Mumbai</i></span>
                </li>
                <li>
                  <img src={'/delhi.jpeg'} />
                  <span><i>delhi</i></span>
                </li>
                <li>
                  <img src={'/bangluru.jpeg'} />
                  <span><i>bangluru</i></span>
                </li>
                <li>
                  <img src={'/bangluru.jpeg'} />
                  <span><i>Indor</i></span>
                </li> */}
              </ul>

            </div>

          </div>
        </section>

        <section className='project-sec'>
        {data?.msg?.builder?.cards?.map((card:any)=>{
           return(
            <div key={card?.id}>
            {card?.builder_card_property?.length> 0 &&
            <div className='container py-3 py-md-5'>
            <div className='project-sec-header'>
              <h3>More Projects by <span>{card?.builder?.company_name} in {card?.city?.name}</span></h3>
              <h6>{card?.builder_card_property?.length} Project</h6>
            </div>

            <Swiper
            spaceBetween={0}
            slidesPerView={3}
            onSlideChange={() => console.log('slide change')}
            onSwiper={(swiper) => console.log(swiper)}
            breakpoints={{
              0: {
                slidesPerView: 1
              },
              400:{
                slidesPerView:1
              },
              768:{
                slidesPerView:2
              },
              1000:{
                slidesPerView:3
              },
              1200:{
                slidesPerView:3
              },
              
            }}
          >
{card?.builder_card_property?.map((property:any)=>{
return(
  <SwiperSlide key={property?.id}>
  <div className="properties_box">
      <a href="#">
        <div className="properties_box_img">
{property?.property?.images.length>0 && 
  <img src={property?.property?.images[0]?.url} alt="Vercel Logo" />
}
          

          {property?.property?.property_details?.property_status &&
          <span className="properties_img_tag">
             {(() => {
      switch (property?.property?.property_details.property_status) {
        case 'ready_to_move':
          return <>Ready to move</>;
        case 'under_construction':
          return <>Under Construction</>;
        default:
          return null; // Or other content for other cases
      }
    })()}
          </span>
          }
          
        </div>
      
        <div className="properties_box_body">
          <div className="property_title"><AbbreviateLongName fullName={property?.property?.name} maxLength={8} /></div>

          <div className="properties_box_items">
            <h5>{property?.property?.property_type?.type_data?.name}</h5>
            <span className="properties_tag">{property?.property?.type}</span>
          </div>

          <div className="properties_box_items">
            <h6>{property?.property?.property_details?.city?.name}</h6>
            <div className="properties_area">{property?.property?.property_details?.carpet_area} sq.ft</div>
          </div>
          {property?.property?.amenities.length>0 && 
          <div className="properties_box_items">
          <ul>
            {property?.property?.amenities?.map((aminity:any)=>{
              return (
                  <li key={aminity?.id}>{aminity?.amenity_data?.name}</li>
              )
            })}
            
          </ul>
          <div className="properties_price">{formatPrice(property?.property?.property_details?.price)}</div>
        </div>
          }
          

        </div>
      </a>
  </div>
</SwiperSlide>
)
})}

            {/* <SwiperSlide>
              <div className="properties_box">
                  <a href="#">
                    <div className="properties_box_img">
                      <img src={'/city.jpeg'} />
                      <span className="properties_img_tag">Under Construction</span>
                    </div>
                  
                    <div className="properties_box_body">
                      <div className="property_title">Find Easy,...</div>

                      <div className="properties_box_items">
                        <h5>Apartment</h5>
                        <span className="properties_tag">Sale</span>
                      </div>

                      <div className="properties_box_items">
                        <h6>Pune</h6>
                        <div className="properties_area">1200 sq.ft</div>
                      </div>

                      <div className="properties_box_items">
                        <ul>
                          <li>2 BHK</li>
                        </ul>
                        <div className="properties_price">₹ 25.00 Lac</div>
                      </div>

                    </div>
                  </a>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="properties_box">
                  <a href="#">
                    <div className="properties_box_img">
                      <img src={'/city.jpeg'} />
                      <span className="properties_img_tag">Under Construction</span>
                    </div>
                  
                    <div className="properties_box_body">
                      <div className="property_title">Find Easy,...</div>

                      <div className="properties_box_items">
                        <h5>Apartment</h5>
                        <span className="properties_tag">Sale</span>
                      </div>

                      <div className="properties_box_items">
                        <h6>Pune</h6>
                        <div className="properties_area">1200 sq.ft</div>
                      </div>

                      <div className="properties_box_items">
                        <ul>
                          <li>2 BHK</li>
                        </ul>
                        <div className="properties_price">₹ 25.00 Lac</div>
                      </div>

                    </div>
                  </a>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="properties_box">
                  <a href="#">
                    <div className="properties_box_img">
                      <img src={'/city.jpeg'} />
                      <span className="properties_img_tag">Under Construction</span>
                    </div>
                  
                    <div className="properties_box_body">
                      <div className="property_title">Find Easy,...</div>

                      <div className="properties_box_items">
                        <h5>Apartment</h5>
                        <span className="properties_tag">Sale</span>
                      </div>

                      <div className="properties_box_items">
                        <h6>Pune</h6>
                        <div className="properties_area">1200 sq.ft</div>
                      </div>

                      <div className="properties_box_items">
                        <ul>
                          <li>2 BHK</li>
                        </ul>
                        <div className="properties_price">₹ 25.00 Lac</div>
                      </div>

                    </div>
                  </a>
              </div>
            </SwiperSlide> */}
          </Swiper>
          </div>
            }
            </div>
            

           ) 
       })}      
        </section>


        <section className='perfect-loan py-4 py-md-5'>
          <div className='container'>
            <div className='row'>
              <div className='col-12 col-md-8 m-auto'>
                <div className='row g-3'>
                  <div className='col-12 col-md-6'>
                    <h3>Find The Perfect Loan For You</h3>
                    <p>Find your cheapest loan in minutes then click to apply instantly. It&apos;s free and won&apos;t 
                      affect your credit score.</p>
                      <button type="button" className="btn btn-login-btn">Compare Loan</button>
                  </div>
                  <div className='col-12 col-md-6'>
                    <img src={'/perfect-loan.svg'} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className='contact-sec py-4 py-md-5'>
          <div className='container'>
            <div className='contact-box'>
              <h3><Link href={process.env.NEXT_PUBLIC_BASE_LIVE_URL+`frontuser/property`} target='_blank'>Contact to EstateOn</Link></h3>
              <p>We love questions, feedbacks and we are always happy to help.<br/> Here is one way to 
              contact us.</p>
            </div>
          </div>
        </section>
        </div>

  
  </>
): null }
        

        <footer>
          <div className='container'>
            <div className='row'>
              <div className='col-12 col-md-3'>
                <div className='footer-box'>
                  <a href={process.env.NEXT_PUBLIC_BASE_LIVE_URL} target='_blank'><img src="{'/logo.png'}" width={134} height={63} alt='logo-image'/></a>
                  <p>We’re reimagining how you buy, sell and rent. It’s now easier to get into a place 
                    you love. So let’s do this, together</p>
                </div>
              </div>

              <div className='col-12 col-md-3'>
                <div className='footer-box'>
                  <ul>
                    <li><a href={process.env.NEXT_PUBLIC_BASE_LIVE_URL} target='_blank'>Home</a></li>
                    <li><a href={process.env.NEXT_PUBLIC_BASE_LIVE_URL+`aboutus`} target='_blank'>About Us</a></li>
                    <li><a href={process.env.NEXT_PUBLIC_BASE_LIVE_URL+`list`} target='_blank'>Properties</a></li>
                    {/* <li><a href='#'>More</a></li> */}
                  </ul>
                </div>
              </div>

              <div className='col-12 col-md-3'>
                <div className='footer-box'>
                  <ul>
                    <li><a href={process.env.NEXT_PUBLIC_BASE_LIVE_URL+`list`} target='_blank'>Local Properties</a></li>
                    <li><a href='#'>Explore Our Builders</a></li>
                    <li><a href={process.env.NEXT_PUBLIC_BASE_LIVE_URL+`frontuser/property`} target='_blank'>Post Property Free</a></li>
                    <li><a href={process.env.NEXT_PUBLIC_BASE_LIVE_URL+`frontuser/property`} target='_blank'>Create Your Builder Profile</a></li>
                  </ul>
                </div>
              </div>

              <div className='col-12 col-md-3'>
                <div className='footer-box'>
                  <div className='social-media'>
                    <a href="https://www.instagram.com/estateonofficial/" target="_blank">
                      <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18.75 15C18.75 15.7417 18.5301 16.4667 18.118 17.0834C17.706 17.7001 17.1203 18.1807 16.4351 18.4645C15.7498 18.7484 14.9958 18.8226 14.2684 18.6779C13.541 18.5333 12.8728 18.1761 12.3483 17.6516C11.8239 17.1272 11.4667 16.459 11.3221 15.7316C11.1774 15.0042 11.2516 14.2502 11.5355 13.5649C11.8193 12.8797 12.2999 12.294 12.9166 11.882C13.5333 11.4699 14.2583 11.25 15 11.25C15.9936 11.2531 16.9456 11.6492 17.6482 12.3518C18.3508 13.0544 18.7469 14.0064 18.75 15ZM26.7188 9.84375V20.1562C26.7188 21.8967 26.0273 23.5659 24.7966 24.7966C23.5659 26.0273 21.8967 26.7188 20.1562 26.7188H9.84375C8.10327 26.7188 6.43407 26.0273 5.20336 24.7966C3.97265 23.5659 3.28125 21.8967 3.28125 20.1562V9.84375C3.28125 8.10327 3.97265 6.43407 5.20336 5.20336C6.43407 3.97265 8.10327 3.28125 9.84375 3.28125H20.1562C21.8967 3.28125 23.5659 3.97265 24.7966 5.20336C26.0273 6.43407 26.7188 8.10327 26.7188 9.84375ZM20.625 15C20.625 13.8875 20.2951 12.7999 19.677 11.8749C19.0589 10.9499 18.1804 10.2289 17.1526 9.80318C16.1248 9.37744 14.9938 9.26604 13.9026 9.48308C12.8115 9.70013 11.8092 10.2359 11.0225 11.0225C10.2359 11.8092 9.70013 12.8115 9.48308 13.9026C9.26604 14.9938 9.37744 16.1248 9.80318 17.1526C10.2289 18.1804 10.9499 19.0589 11.8749 19.677C12.7999 20.2951 13.8875 20.625 15 20.625C16.4918 20.625 17.9226 20.0324 18.9775 18.9775C20.0324 17.9226 20.625 16.4918 20.625 15ZM22.5 8.90625C22.5 8.62812 22.4175 8.35624 22.263 8.12498C22.1085 7.89372 21.8889 7.71348 21.6319 7.60704C21.3749 7.50061 21.0922 7.47276 20.8194 7.52702C20.5466 7.58128 20.296 7.71521 20.0994 7.91188C19.9027 8.10855 19.7688 8.35912 19.7145 8.6319C19.6603 8.90469 19.6881 9.18744 19.7945 9.4444C19.901 9.70136 20.0812 9.92098 20.3125 10.0755C20.5437 10.23 20.8156 10.3125 21.0938 10.3125C21.4667 10.3125 21.8244 10.1643 22.0881 9.90062C22.3518 9.6369 22.5 9.27921 22.5 8.90625Z" fill="#C42128"/>
                      </svg>
                    </a>
                    <a href="https://twitter.com/EstateOn_" target="_blank">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22.46 6C21.69 6.35 20.86 6.58 20 6.69C20.88 6.16 21.56 5.32 21.88 4.31C21.05 4.81 20.13 5.16 19.16 5.36C18.37 4.5 17.26 4 16 4C13.65 4 11.73 5.92 11.73 8.29C11.73 8.63 11.77 8.96 11.84 9.27C8.28004 9.09 5.11004 7.38 3.00004 4.79C2.63004 5.42 2.42004 6.16 2.42004 6.94C2.42004 8.43 3.17004 9.75 4.33004 10.5C3.62004 10.5 2.96004 10.3 2.38004 10V10.03C2.38004 12.11 3.86004 13.85 5.82004 14.24C5.19077 14.4122 4.53013 14.4362 3.89004 14.31C4.16165 15.1625 4.69358 15.9084 5.41106 16.4429C6.12854 16.9775 6.99549 17.2737 7.89004 17.29C6.37367 18.4904 4.49404 19.1393 2.56004 19.13C2.22004 19.13 1.88004 19.11 1.54004 19.07C3.44004 20.29 5.70004 21 8.12004 21C16 21 20.33 14.46 20.33 8.79C20.33 8.6 20.33 8.42 20.32 8.23C21.16 7.63 21.88 6.87 22.46 6Z" fill="#C42128"/>
                      </svg>
                    </a>
                    <a href="https://www.linkedin.com/company/estateon" target="_blank">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.93994 5.00002C6.93968 5.53046 6.72871 6.03906 6.35345 6.41394C5.97819 6.78883 5.46937 6.99929 4.93894 6.99902C4.40851 6.99876 3.89991 6.78779 3.52502 6.41253C3.15014 6.03727 2.93968 5.52846 2.93994 4.99802C2.94021 4.46759 3.15117 3.95899 3.52644 3.5841C3.9017 3.20922 4.41051 2.99876 4.94094 2.99902C5.47137 2.99929 5.97998 3.21026 6.35486 3.58552C6.72975 3.96078 6.94021 4.46959 6.93994 5.00002ZM6.99994 8.48002H2.99994V21H6.99994V8.48002ZM13.3199 8.48002H9.33994V21H13.2799V14.43C13.2799 10.77 18.0499 10.43 18.0499 14.43V21H21.9999V13.07C21.9999 6.90002 14.9399 7.13002 13.2799 10.16L13.3199 8.48002Z" fill="#C42128"/>
                      </svg>
                    </a>
                    <a href="https://facebook.com/EstateOnOfficial" target="_blank">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15.1199 5.32003H16.9999V2.14003C16.0896 2.04538 15.175 1.99865 14.2599 2.00003C11.5399 2.00003 9.67986 3.66003 9.67986 6.70003V9.32003H6.60986V12.88H9.67986V22H13.3599V12.88H16.4199L16.8799 9.32003H13.3599V7.05003C13.3599 6.00003 13.6399 5.32003 15.1199 5.32003Z" fill="#C42128"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className='copyright'>Copyright@2023 All Rights Resaved By Estateon</div>
          </div>
        </footer>

    </main>
  );


};

export default BuilderPage;