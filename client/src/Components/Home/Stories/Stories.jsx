import "./stories.scss";

import { AiOutlinePlus } from "react-icons/ai";

const Stories = () => {
  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  };
  return (
    <div className="stories">
      <h3>Stories</h3>
      <div className="stories__list">
        <div className="stories__item">
          <div className="border">
            <AiOutlinePlus />
          </div>
          <p>Add Story</p>
        </div>
        <div className="stories__item">
          <div className="image">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/shorturl-phototourl.appspot.com/o/message%2F4340649558%2Fimage?alt=media&token=2d22be17-3981-4c34-9ade-f5fe9406a642"
              alt=""
              className="img"
            />
          </div>
          <p>{truncate("User Userov", 11)}</p>
        </div>
        <div className="stories__item">
          <div className="image">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/shorturl-phototourl.appspot.com/o/message%2F4340649558%2Fimage?alt=media&token=2d22be17-3981-4c34-9ade-f5fe9406a642"
              alt=""
              className="img"
            />
          </div>
          <p>User User</p>
        </div>
      </div>
    </div>
  );
};

export default Stories;
