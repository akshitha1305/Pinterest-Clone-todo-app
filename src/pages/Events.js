import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    apiUrl,
    apidomain,
    deleteApi,
    getApi,
    postApi,
    putApi
} from "../utilits/helpers/apiService";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Events = () => {
    const [isAdd, setIsAdd] = useState(false);
    const [eventsList, setEventsList] = useState([]);
    const [eventData, setEventData] = useState({});
    const [videoTag, setVideoTag] = useState("");
    const [eventFormData, setEventFormData] = useState({
        title: "",
        description: "",
        image_paths: [],
        video_tags: []
    });

    // pagination variables
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [previousPage, setPreviousPage] = useState(0);
    const [nextPage, setNextPage] = useState(1);
    const [pageLimits, setPageLimits] = useState(10);
    const [recordPerPage, setRecordPerPage] = useState(0);
    const [totalRecords, setTotalRecords] = useState(0);


    const getEvents = async (page = 1, limit = 10) => {
        let url = `/events/get?page=${page}&limit=${limit}`
        const response = await getApi(url);
        handlePagination(response.response)
        setEventsList(response.response.data);
    }

    const triggerApiCall = (page) => {
        getEvents(page > 0 ? page : 1, pageLimits)
    }

    const handlePagination = (resData) => {
        setPreviousPage(resData.previous);
        setNextPage(resData.next);
        setTotalPages(resData.totalPages);
        setCurrentPage(resData.next ? resData.next - 1 : 1);
        setPageLimits(resData.recordsPerPage);
        setRecordPerPage(resData.recordsPerPage);
        setTotalRecords(resData.total);
    }


    const fetchEventData = async (id) => {
        try {
            let url = `/events/get/${id}`
            const response = await getApi(url);
            setEventData(response.response);
            setEventFormData({
                ...eventFormData,
                title: response.response.title,
                description: response.response.description,
                image_paths: response.response.image_paths,
                video_tags: response.response.video_tags
            });
            setIsAdd(true);
        } catch (error) {
            console.log(error);
        }
    }

    const deleteEvent = async (id) => {
        try {
            let url = `/events/delete/${id}`
            const response = await deleteApi(url);
            toast.success(response.data.message);
            getEvents();
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getEvents();
    }, []);


    const eventSubmitHandleForm = async () => {
        try {

            if (eventData && eventData?._id) {
                let url = `/events/update/${eventData?._id}`;
                const response = await putApi(url, eventFormData);
                toast.success(response.data.message);
                setIsAdd(false);
            } else {
                let url = "/events";
                const response = await postApi(url, eventFormData);
                toast.success(response.data.message);
                setIsAdd(false);
            }
            getEvents();
        } catch (error) {
            toast.error(error.response.data.message);
            console.log(error);
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEventFormData({
            ...eventFormData,
            [name]: value
        });
    }

    const removeImage = (index) => {
        let images = [...eventFormData.image_paths];
        images.splice(index, 1);
        setEventFormData({
            ...eventFormData,
            image_paths: images
        });
    }

    const handleImageUpload = (e) => {
        e.preventDefault();
        const selectedFiles = e.target.files;

        if (!selectedFiles) {
            toast.warning("Please select a file");
        }
        const formData = new FormData();
        // Append files to eventFormData
        for (let i = 0; i < selectedFiles.length; i++) {
            formData.append('files', selectedFiles[i]);
        }

        axios
            .post(apiUrl + "/upload", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then((response) => {
                setEventFormData({
                    ...eventFormData,
                    image_paths: [...eventFormData.image_paths, ...response.data.files]
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const handleVideoTag = () => {

        setEventFormData({
            ...eventFormData,
            video_tags: [...eventFormData.video_tags, videoTag]
        });

        setVideoTag("");

    }

    const removeVideoTag = (index) => {
        let videos = [...eventFormData.video_tags];
        videos.splice(index, 1);
        setEventFormData({
            ...eventFormData,
            video_tags: videos
        });
    }
    return (
        <>
            <section>
                <div className="container">
                    <ToastContainer />
                    <div className="row">
                        {!isAdd && (
                            <div className="col-xl-12 col-lg-12 mt-5">
                                <div className="card p-0">
                                    <div className="container">
                                        <div className="row ">
                                            <div className="col-lg-8 col-md-8 col-sm-8 col-12 stripBg p-3">
                                                <h5>Events</h5>
                                            </div>
                                            <div className="col-lg-4 col-md-4 col-sm-4 col-12  p-3 stripBg text-lg-end text-md-end text-sm-end">
                                                <button className="hideAndShowBtns" onClick={() => setIsAdd(true)}>Add +</button>
                                            </div>
                                            <div className="col-12 mt-3 d-none">
                                                <input type="search" placeholder="Search Class" />
                                            </div>
                                            <div className="col-12 py-3 px-0">
                                                <div className="body p-0">
                                                    <div className="table-responsive">
                                                        <table className="table table-hover m-0">
                                                            <thead>
                                                                <tr className="text-center tableHead">
                                                                    <th>S.No</th>
                                                                    <th>Title</th>
                                                                    <th>Actions</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {eventsList ? (
                                                                    <>
                                                                        {eventsList.map((event, index) => (
                                                                            <>
                                                                                <tr key={event._id} className="text-center">
                                                                                    <td>{index + 1}</td>
                                                                                    <td>{event.title}</td>
                                                                                    <td>
                                                                                        <i className="fa-solid fa-pen me-3 text-success" onClick={() => fetchEventData(event._id)} ></i>
                                                                                        <i className="fa-solid fa-trash text-danger" onClick={() => deleteEvent(event._id)}></i>
                                                                                    </td>
                                                                                </tr>
                                                                            </>
                                                                        ))}
                                                                        <tr>
                                                                            <td>Pages: {totalPages} Per pages: {recordPerPage} Records: {totalRecords}</td>
                                                                            <td>
                                                                                <input className='form-control' style={{ width: '75px' }} type="number" value={pageLimits} onChange={(e) => setPageLimits(e.target.value)} />
                                                                            </td>
                                                                            <td>
                                                                                {
                                                                                    previousPage > 0 ? (
                                                                                        <a className="link-info" onClick={() => triggerApiCall(previousPage)} >{`<<`} {previousPage}</a>
                                                                                    ) :
                                                                                        <a className="link link-info" >{`<<`} 0 </a>
                                                                                }
                                                                                <span style={{ margin: '0 10px', fontWeight: 'bold', color: 'red', border: '1px solid red', padding: '5px', borderRadius: '5px' }}>
                                                                                    {currentPage}
                                                                                </span>
                                                                                {
                                                                                    nextPage ? (
                                                                                        <a className="link link-info" onClick={() => triggerApiCall(nextPage)}>{nextPage} {`>>`}</a>
                                                                                    ) :
                                                                                        <a className="link-info" >{`>>`} </a>
                                                                                }
                                                                            </td>

                                                                        </tr>
                                                                    </>
                                                                ) : (
                                                                    <tr>
                                                                        <td colSpan="4" className="text-center">No Events found</td>
                                                                    </tr>

                                                                )}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {isAdd && (
                            <div className="col-xl-12 col-lg-12 mt-5">
                                <div className="card p-0">
                                    <div className="container">
                                        <div className="row stripBg">
                                            <div className="col-lg-8 col-md-8 col-sm-8 col-12  p-3">
                                                <h5>EVENTS INFORMATION</h5>
                                            </div>
                                            <div className="col-lg-4 col-md-4 col-sm-4 col-12  p-3 stripBg text-lg-end text-md-end text-sm-end">
                                                <button className="hideAndShowBtns" onClick={() => setIsAdd(false)}>Back</button>
                                            </div>
                                        </div>
                                        <form name="eventsForm" id="eventsForm" onSubmit={eventSubmitHandleForm}>
                                            <div className="row px-2">
                                                <div className="col-lg-6 mt-3">
                                                    <label htmlFor="title" className="form-label">Title<span className="text-danger">*</span></label>
                                                    <input type="text" name="title" id="title" placeholder="Title" onChange={handleChange} value={eventFormData.title} />
                                                    {/* {errors.title && <span className="error">{errors.title}</span>} */}
                                                </div>
                                                <div className="col-lg-6 mt-3">
                                                    <label htmlFor="title" className="form-label">Description</label>
                                                    <input type="text" name="description" id="description" placeholder="Description" onChange={handleChange} value={eventFormData.description} />
                                                </div>
                                            </div>
                                            <div className="row px-2">
                                                <div className="col-lg-6 mt-3">
                                                    <label htmlFor="image_paths" className="form-label">Upload a Image<span className="text-danger">*</span></label>
                                                    <input type="file" multiple name="image_paths" id="image_paths" placeholder="Upload a Image" onChange={handleImageUpload} />
                                                </div>
                                                <div className="col-lg-6 mt-3">
                                                    <label htmlFor="image_paths" className="form-label">Uploaded Images</label>
                                                    {eventFormData?.image_paths.map((data, index) => (
                                                        <div className="row" key={index}>
                                                            <div className="col-6">
                                                                <img src={`${apidomain}/${data}`} style={{ width: '100px', height: '100px' }} />
                                                                <i className="fa-solid fa-trash text-danger" onClick={() => removeImage(index)}></i>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="row px-2">
                                                <div className="col-12 mt-3">
                                                    <div className="row">
                                                        <div className="col-6 py-3 px-0">
                                                            <div className="body p-0">
                                                                <div className="table-responsive">
                                                                    <table className="table table-hover m-0">
                                                                        <thead>
                                                                            <tr className="text-center tableHead">
                                                                                <th>S.No</th>
                                                                                <th>Video Tag</th>
                                                                                <th>Action</th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            {eventFormData.video_tags.length > 0 ? (
                                                                                eventFormData.video_tags.map((data, index) => (
                                                                                    <tr key={index}>
                                                                                        <td className="text-center">{index + 1}</td>
                                                                                        <td className="text-center">{data}</td>
                                                                                        <td className="text-center">
                                                                                            <i className="fa-solid fa-trash text-danger" onClick={() => removeVideoTag(index)}></i>
                                                                                        </td>
                                                                                    </tr>
                                                                                ))
                                                                            ) : (
                                                                                <tr>
                                                                                    <td colSpan="7" className="text-center">No Data Found</td>
                                                                                </tr>
                                                                            )}
                                                                        </tbody>
                                                                    </table>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-6">
                                                            <div className="row">
                                                                <div className="col-lg-12 col-md-12 col-sm-12 col-12 pt-3">
                                                                    <div className="input-group">
                                                                        <label htmlFor="video_tags" className="form-label">Video Tag<span className="text-danger">*</span></label>
                                                                        <input type="text" name="video_tags" id="video_tags" value={videoTag} onChange={(e) => setVideoTag(e.target.value)} placeholder="Video Tag" />
                                                                    </div>
                                                                </div>

                                                                <div className="col-12 mt-3 text-center">
                                                                    <button className='allBtns w-100' onClick={handleVideoTag} type='button'>Add</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row px-2">

                                                <div className="col-12 my-5 text-center">
                                                    <button type="submit" className="allBtns w-100">
                                                        Submit
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        )}

                    </div>
                </div>
            </section>
        </>
    )
}

export default Events
