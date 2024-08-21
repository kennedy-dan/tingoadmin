import React, { useState, useEffect } from 'react';
import ContainerDefault from '~/components/layouts/ContainerDefault';
import HeaderDashboard from '~/components/shared/headers/HeaderDashboard';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Select, ConfigProvider } from 'antd';
import {
    getAdmincategories,
    AddProducts,
    AddAds,
    AddPgs,
} from '~/redux/features/productSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import { Modal, Button } from 'antd';

const FormAccountSettings = () => {
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [cats, setCats] = useState(null);
    const [openQr, setOPenQr] = useState(false);

    const [price, setPrice] = useState(null);
    const [stock, setInstock] = useState(null);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [selectedImages, setSelectedImages] = useState([]);
    const { getadmincarts } = useSelector((state) => state.product);
    const [savedId, setSavedId] = useState(null);

    console.log(savedId);

    const handleUpload = async () => {
        try {
          const response = await fetch(selectedImage);
          const blob = await response.blob();
          const file = new File([blob], 'image.png', { type: blob.type });
            console.log(file)
          return file
          
        } catch (error) {
          console.error('Error converting URL to file:', error);
        }
      };

      const handleImageUpload = (event) => {
        const files = Array.from(event.target.files);
        setSelectedFiles(files);

        const images = files.map(file => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            return new Promise((resolve) => {
                reader.onloadend = () => {
                    resolve(reader.result);
                };
            });
        });

        Promise.all(images).then((imagesData) => {
            setSelectedImages(imagesData);
            localStorage.setItem('uploadedImages', JSON.stringify(imagesData));
        });
    };

    const openModal = (id) => {
        setOPenQr(true);
        setId(id);
    };

    const closeQrModal = () => {
        setOPenQr(false);
    };

    const triggerFileInput = () => {
        document.getElementById('fileInput').click();
    };

    const handleSubmit = async () => {
        const data = new FormData();
        data.append('content', description);
        data.append('title', name);
        data.append('page_id', savedId);

        selectedFiles.forEach((file, index) => {
            data.append('files[]', file);
        });

        dispatch(AddAds(data));
    };


    const submit = async () => {
        const data = {
            title: title,
        };

        try {
            const resultAction = await dispatch(AddPgs(data));
            const response = unwrapResult(resultAction);

            console.log(response);

            // Assuming the response contains an id field
            if (response && response.data.data.id) {
                setSavedId(response.data.data.id);
                setOPenQr(false);
            }
        } catch (error) {
            // Handle any errors here
            console.error('Failed to add page:', error);
        }
    };
    return (
        <div className="ps-form--account-settings">
            <div>
                <button onClick={openModal} className="ps-btn ps-btn--sm">
                    Create page
                </button>
            </div>
            <div className="row">
                <div className="col-sm-6">
                    <div className="form-group">
                        <label>Title</label>
                        <input
                            className="form-control"
                            type="text"
                            placeholder=""
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                </div>

                <div className="col-sm-12">
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            className="form-control"
                            type="text"
                            placeholder=""
                        />
                    </div>
                </div>

                <div className="col-sm-6">
                    <div className="form-group">
                        <label>Content</label>
                        <input
                            className="form-control"
                            type="text"
                            placeholder=""
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                </div>
                <div className="col-sm-12">
                    <div className="form-group">
                        <label>Product Gallery</label>
                        <div className="form-group--nest">
                            <input
                                className="form-control mb-1"
                                id="fileInput"
                                type="file"
                                accept="image/*"
                                multiple
                                style={{ display: 'none' }}
                                onChange={handleImageUpload}
                            />
                            <button
                                onClick={triggerFileInput}
                                className="ps-btn ps-btn--sm">
                                Choose
                            </button>
                            <div className="image-preview mt-3">
                            {selectedImages.map((image, index) => (
                                <img
                                    key={index}
                                    src={image}
                                    alt={`selected-${index}`}
                                    style={{ 
                                        width: '100px',
                                        height: '100px',
                                        marginRight: '10px',
                                        objectFit: 'cover',
                                    }}
                                />
                            ))}
                        </div>

                      
                        </div>
                    </div>
                </div>
            </div>
            <div className="ps-form__submit text-center">
                <button className="ps-btn ps-btn--gray mr-3">Cancel</button>
                <button onClick={handleSubmit} className="ps-btn success">
                    Update Profile
                </button>
            </div>
            <Modal
                // title="Print QR"
                open={openQr}
                // onOk={handleOk}
                footer={false}
                onCancel={closeQrModal}
                maskStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }}
                style={{ marginTop: 0, top: 0 }}>
                <p>Name</p>
                <input
                    className="w-full border border-1 px-3 py-3 mt-4 "
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <div className="mt-4">
                    <button
                        className="bg-primary p-2 rounded-lg text-white"
                        onClick={submit}>
                        Submit
                    </button>
                </div>
            </Modal>
        </div>
    );
};

export default FormAccountSettings;
