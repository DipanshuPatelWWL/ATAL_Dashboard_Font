import React, { useEffect, useState } from 'react'
import { FaPlus } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { RiEdit2Fill } from "react-icons/ri";
import API, { IMAGE_URL } from '../../API/Api';

function Testimonials() {
    const [showModal, setShowModal] = useState(false)
    const [modalType, setModalType] = useState("add")
    const [formData, setFormData] = useState({
        fullName: "",
        heading: "",
        description: "",
        image: null,
        rating: "",
    })


    const handleChange = (e) => {
        setFormData({
            ...formData, [e.target.name]: e.target.value
        })
    }



    const handleUpdateClick = (testimonial) => {
        setModalType("update");
        setShowModal(true);
        setFormData({
            id: testimonial._id,
            fullName: testimonial.fullName,
            heading: testimonial.heading,
            description: testimonial.description,
            image: testimonial.image,
            rating: testimonial.rating
        });
    };


    //for image upload
    const handleFileChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            image: e.target.files[0]

        }))
    }


    {/*Get API*/ }
    const [testimonialData, setTestimonialData] = useState([{}])
    const fetchTestimonial = async () => {
        try {
            const response = await API.get("/getTestimonial")
            setTestimonialData(response.data.testimonial)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchTestimonial()
    }, [])


    //delete API
    const handleDelete = async (id) => {
        try {
            await API.delete(`/deleteTestimonial/${id}`)
            fetchTestimonial();
        } catch (error) {
            console.error(error)
        }
    }



    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formDataToSend = new FormData();
            formDataToSend.append("fullName", formData.fullName);
            formDataToSend.append("heading", formData.heading);
            formDataToSend.append("description", formData.description);
            if (formData.image) {
                formDataToSend.append("image", formData.image);
            }
            formDataToSend.append("rating", Number(formData.rating));

            if (modalType === "add") {
                await API.post("/addTesimonial", formDataToSend, {
                    headers: { "Content-Type": "multipart/form-data" }
                });
                alert("Testimonial created successfully.");
            } else {
                await API.put(`/updateTestimonial/${formData.id}`, formDataToSend, {
                    // headers: { "Content-Type": "multipart/form-data" }
                });
                alert("Testimonial updated successfully");
            }
            console.log("formdatatosned", formDataToSend);


            setShowModal(false);
            setFormData({ fullName: "", heading: "", description: "", image: null, rating: "" });
            fetchTestimonial();
        } catch (error) {
            console.error("Submit Error:", error);
        }
    };



    return (
        <div className='p-4'>
            <div className='flex justify-end'>
                <button onClick={() => { setShowModal(true), setModalType("add") }}
                    className='bg-green-500 text-white px-3 py-1 text-xl font-semibold rounded-lg mb-4 hover:cursor-pointer flex items-center gap-2'><FaPlus />ADD TESTMONIAL</button>
            </div>


            {/* Table bar */}
            <div className='overflow-x auto w-full'>
                <div className='grid grid-cols-6 gap-x-6 bg-black text-white px-4 py-2 font-semibold'>
                    <div className='text-lg'>Name</div>
                    <div className='text-lg'>Heading</div>
                    <div className='text-lg'>Description</div>
                    <div className='text-lg'>Image</div>
                    <div className='text-lg'>Rating</div>
                    <div className='text-lg'>Action</div>
                </div>
                {
                    testimonialData.map((data, idx) => (
                        <div key={idx}
                            className="grid grid-cols-6 gap-x-10 items-start border-b border-gray-300 py-2 px-4">
                            <p>{data.fullName}</p>
                            <p>{data.heading}</p>
                            <p>{data.description}</p>
                            {data.image && (
                                <img
                                    src={data.image.startsWith("http") ? data.image : `${IMAGE_URL + data.image}`}
                                    alt={data.name}
                                    className="w-16 h-16 object-cover rounded"
                                />
                            )}
                            <p>{data.rating}</p>
                            <div className="flex gap-2">
                                <div>
                                    <button onClick={() => handleUpdateClick(data)}
                                        className="bg-blue-500 px-3 py-1 rounded-xl text-white hover:cursor-pointer">
                                        <RiEdit2Fill className="text-2xl" />
                                    </button>
                                </div>
                                <div>
                                    <button
                                        className="bg-red-500 px-3 py-1 rounded-xl text-white hover:cursor-pointer"
                                        onClick={() => handleDelete(data._id)}>
                                        <MdDelete className="text-2xl" />


                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                }



                {/* Modal */}
                {showModal &&
                    <div className='fixed inset-0 backdrop-blur-sm flex justify-center items-center'>
                        <div className='bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative'>
                            <h2 className="text-xl font-bold mb-4">Add Testimonial</h2>

                            <form onSubmit={handleSubmit} className='space-y-4'>
                                <div>
                                    <label className='block text-gray-700'>Name</label>
                                    <input type="text"
                                        name='fullName'
                                        placeholder='Your Name'
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        className="w-full border rounded p-2 focus:outline-none focus:border-red-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className='block text-gray-700'>Heading</label>
                                    <input type="text"
                                        name='heading'
                                        placeholder='Your Name'
                                        value={formData.heading}
                                        onChange={handleChange}
                                        className="w-full border rounded p-2 focus:outline-none focus:border-red-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className='block text-gray-700'>Description</label>
                                    <textarea
                                        name='description'
                                        value={formData.description}
                                        onChange={handleChange}
                                        className="w-full border rounded p-2 focus:outline-none focus:border-red-500"
                                        required>
                                    </textarea>
                                </div>
                                <div>
                                    <label className='block text-gray-700'>Image</label>
                                    <input type="file"
                                        name='image'
                                        onChange={handleFileChange}
                                        className="w-full border rounded p-2 focus:outline-none focus:border-red-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className='block text-gray-700'>Rating</label>
                                    <input
                                        type="number"
                                        name='rating'
                                        value={formData.rating}
                                        onChange={handleChange}
                                        className="w-full border rounded p-2 focus:outline-none focus:border-red-500"
                                        min="1"
                                        max="5"
                                        required
                                    />

                                </div>



                                <div className="flex justify-between mt-4">
                                    <button
                                        onClick={() => { setShowModal(false) }}
                                        className='bg-gray-500 text-white px-4 py-2 rounded'
                                        type='button'>
                                        Cancel
                                    </button>
                                    <button
                                        type='submit'
                                        className="bg-green-600 text-white px-4 py-2 rounded">
                                        Submit
                                    </button>
                                </div>
                            </form>
                        </div>

                    </div>

                }

            </div>
        </div>
    )
}

export default Testimonials