import PropTypes from 'prop-types'
import React,{useState, useEffect} from "react"
import MetaTags from 'react-meta-tags';
import { connect } from "react-redux"
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  CardBody,
  Input,
  Alert
} from "reactstrap"
import { Link } from "react-router-dom"

// import images
import servicesIcon3 from "../../assets/images/services-icon/03.png";

import Breadcrumbs from "../../components/Common/Breadcrumb";


import {
  addNewOffer,
  deleteOffer,
  getOffers,
  updateOffer,
} from "../../store/actions"

//i18n
import { withTranslation } from "react-i18next"

const Dashboard = props => {
  const { offers } = props
  const [menu, setMenu] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [searchInput, setSearchInput] = useState('')
  const [filteredOffers, setFilteredOffers] = useState(null)
  const toggle = () => {
    setMenu(!menu)
  }

  useEffect(() => {
    const { onGetOffers } = props
    onGetOffers()
  }, [])

  const handleDeleteOffer = (e, offer) => {
    const { onDeleteOffer } = props
    e.preventDefault();
    onDeleteOffer(offer);
    setSubmitted(true)
  }

  const handleSearchInput = (e) => {
    setSearchInput(e.target.value)
  } 
  
  useEffect(() => {
    if (searchInput) {
      const filteredOffers = offers.filter((offer, index, offers) => Object.values(offer).filter((offerElement) => { return offerElement.toString().toUpperCase().includes(searchInput.toUpperCase()) }).length ? offer : false )
      setFilteredOffers(filteredOffers)
    } else {
      setFilteredOffers(offers)
    }
  }, [searchInput, offers])

  // console.log({ offers });

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Dashboard | Veltrix - Responsive Bootstrap 5 Admin Dashboard</title>
        </MetaTags>
        <Container fluid>
          <Breadcrumbs
            maintitle="Recrutement"
            title="Dashboard"
            breadcrumbItem="Liste Des Offres"
          />
          <div className="page-title-box">
          </div>
          <Row>
            <Col xl={3} md={6}>
              <Card className="mini-stat bg-primary text-white">
                <CardBody>
                  <div>
                    <div className="float-start mini-stat-img me-4">
                      <img src={servicesIcon3} alt="" />
                    </div>
                    <h5 className="font-size-16 text-uppercase mt-0 text-white-50">
                      Offres
                    </h5>
                    <h4 className="fw-medium font-size-24 mb-0">
                      {offers.length}
                      {/* <i className="mdi mdi-arrow-up text-success ms-2"></i> */}
                    </h4>
                    {/* <div className="mini-stat-label bg-info">
                      <p className="mb-0"> 00%</p>
                    </div> */}
                  </div>
                  {/* <div className="pt-2">
                    <div className="float-end">
                      <Link to="#" className="text-white-50">
                        <i className="mdi mdi-arrow-right h5"></i>
                      </Link>
                    </div>

                    <p className="text-white-50 mb-0 mt-1">Since last month</p>
                  </div> */}
                </CardBody>
              </Card>
            </Col>
            <Col xl={3} md={6}>
              <Card className="mini-stat bg-info text-white">
                <CardBody>
                  <div>
                    <div className="float-start mini-stat-img me-4">
                      <img src={servicesIcon3} alt="" />
                    </div>
                    <h5 className="font-size-16 text-uppercase mt-0 text-white-50">
                      Filtered Offers
                    </h5>
                    <h4 className="fw-medium font-size-24 mb-0">
                      {filteredOffers ? filteredOffers.length : offers.length}
                      {/* <i className="mdi mdi-arrow-up text-success ms-2"></i> */}
                    </h4>
                    {/* <div className="mini-stat-label bg-info">
                      <p className="mb-0"> 00%</p>
                    </div> */}
                  </div>
                  {/* <div className="pt-2">
                    <div className="float-end">
                      <Link to="#" className="text-white-50">
                        <i className="mdi mdi-arrow-right h5"></i>
                      </Link>
                    </div>

                    <p className="text-white-50 mb-0 mt-1">Since last month</p>
                  </div> */}
                </CardBody>
              </Card>
            </Col>
          </Row>

          <Row className="mb-3 align-items-center">
            <label
              htmlFor="example-search-input"
              className="col-md-2 col-form-label font-size-20"
            >
              Search Offer
            </label>
            <div className="col-md-3">
              <input
                onChange={handleSearchInput}
                name="search"
                value={searchInput}
                className="form-control"
                type="search"
              />
            </div>
          </Row>

          {submitted ? (
            <Alert color="danger" style={{ marginTop: "13px" }} className="mt-2">
              Product Deleted
            </Alert>
          ) : null}

          <Row>
            <Col xl={12}>
              <Card>
                <CardBody>
                  <div style={{ display: 'flex', justifyContent: "space-between" }}>
                    <h4 className="card-title mb-4">Offres</h4>
                    <div>
                      <Link to="/form-elements/add" className="btn btn-primary btn-sm" style={{marginRight: '10px'}}>
                        Ajouter un offre
                      </Link>
                    </div>
                  </div>
                  <div className="table-responsive">
                    <table className="table table-hover table-centered mb-0">
                      <thead>
                        <tr>
                          <th scope="col">(#) Id</th>
                          <th scope="col">poste</th>
                          <th scope="col">description</th>
                          <th scope="col">emplacement</th>
                          <th scope="col">experience</th>
                          <th scope="col">type</th>
                          <th scope="col">niveau</th>
                          <th scope="col">typeemploi</th>
                          <th scope="col" colSpan="2">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredOffers && filteredOffers.map((offer, index) => {
                          return (
                            <React.Fragment key={index}>
                              <tr>
                                <th scope="row">#{offer.id}</th>
                                <td>{offer.poste}</td>
                                <td>{offer.description}</td>
                                <td>{offer.emplacement}</td>
                                <td>{offer.experience}</td>
                                <td>{offer.type}</td>
                                <td>{offer.niveau}</td>
                                <td>{offer.typeemploi}</td>
                                <td>
                                    <Link to={`/form-elements/edit/${offer.id}`} className="btn btn-success btn-sm" style={{margin: '10px'}}>
                                      Edit
                                    </Link>
                                    <Link to="#" className="btn btn-danger btn-sm" onClick={(e) => handleDeleteOffer(e, offer)} style={{margin: '10px'}}>
                                      Delete
                                    </Link>
                                </td>
                              </tr>
                            </React.Fragment>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>

    </React.Fragment>
  )
}

Dashboard.propTypes = {
  t: PropTypes.any,
  offers: PropTypes.array,
  onGetOffers: PropTypes.func,
  onAddNewOffer: PropTypes.func,
  onUpdateOffer: PropTypes.func,
  onDeleteOffer: PropTypes.func,
}

const mapStateToProps = ({ offers }) => ({ offers: offers.offers })

const mapDispatchToProps = dispatch => ({
  onGetOffers: () => dispatch(getOffers()),
  onAddNewOffer: offer => dispatch(addNewOffer(offer)),
  onUpdateOffer: offer => dispatch(updateOffer(offer)),
  onDeleteOffer: offer => dispatch(deleteOffer(offer)),
})

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(Dashboard))
