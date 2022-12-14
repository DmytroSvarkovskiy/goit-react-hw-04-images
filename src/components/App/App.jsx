import { ToastContainer, toast } from 'react-toastify';
import { fetchApi } from 'components/api';
import 'react-toastify/dist/ReactToastify.css';
import { Searchbar } from '../Searchbar/Searchbar';
import { Button } from '../Button/Button';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { Wrapper, Error } from './App.styled';
import { useState, useEffect } from 'react';
import { GlobalStyle } from 'components/GlobalStyle';
import { Loader } from 'components/Loader/Loader';
import { Modal } from 'components/Modal/Modal';
import { CoolPage } from '../ScrollToTop/ScrollToTop';
export const App = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [totalResult, setTotalResult] = useState(0);
  const [searchResults, setSearchResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchName, setSearchName] = useState('');
  const [loaderVisible, setLoaderVisible] = useState(false);
  const [modalData, setSModalData] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!searchName) {
      return;
    }
    async function fetchRes() {
      const response = await fetchApi(searchName, currentPage);
      setTotalResult(response.totalHits);
      if (currentPage === 1) {
        response.totalHits === 0
          ? toast.error("Sorry, we didn't find anything")
          : toast.success(`great, we found ${response.totalHits} images`);
      }
      return response;
    }
    const getImage = async () => {
      try {
        setLoaderVisible(true);
        const response = await fetchRes();
        setSearchResults(prevSearchResults => [
          ...prevSearchResults,
          ...response.hits,
        ]);
      } catch {
        setError(true);
      } finally {
        setLoaderVisible(false);
      }
    };
    getImage();
  }, [searchName, currentPage]);

  const findImage = word => {
    setError(false);
    if (searchName !== word) {
      setSearchName(word);
      setCurrentPage(1);
      searchResults([]);
    }
  };

  const togleModal = () => {
    setModalVisible(!modalVisible);
  };

  const onImageClick = e => {
    togleModal();
    const currentElId = Number(e.target.id);
    const currentItem = searchResults.find(
      element => element.id === currentElId
    );
    setSModalData(currentItem.largeImageURL);
  };
  const loadMoreClick = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const totalPages = Math.ceil(totalResult / searchResults.length);
  return (
    <Wrapper>
      <GlobalStyle />
      <Searchbar onSubmit={findImage} />
      {error && <Error>Something went wrong, please try again</Error>}
      {modalVisible && <Modal dataImage={modalData} closeModal={togleModal} />}
      <ImageGallery
        searchResults={searchResults}
        lookBigImg={onImageClick}
      ></ImageGallery>
      {loaderVisible && <Loader />}
      {searchResults.length !== 0 && totalPages !== 1 && (
        <Button onClick={loadMoreClick} />
      )}
      <ToastContainer autoClose={3000} />
      <CoolPage />
    </Wrapper>
  );
};
