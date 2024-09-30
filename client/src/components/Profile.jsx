import React from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";
import InstagramIcon from "@mui/icons-material/Instagram";
import EmailIcon from "@mui/icons-material/Email";
import ArticleIcon from "@mui/icons-material/Article";
import GitHubIcon from "@mui/icons-material/GitHub";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";

const Profile = () => {
  return (
    <div className="col-span-6 row-span-6 flex justify-center items-center">
      <div className="w-[95%] h-[95%] shadow-full rounded-lg flex">
        <div className="flex-[2_2_0%] flex flex-col gap-4 relative">
          <div className="w-[100px] h-[100px] border-t-2 border-l-2 border-green-700 absolute top-[100px] left-10"></div>
          <div className="absolute top-[200px] left-[200px]">
            <div className="flex">
              <div className="w-[300px]">Name:</div>
              <div>Nguyễn Trọng Trường</div>
            </div>
            <div className="flex">
              <div className="w-[300px]">Student ID:</div>
              <div>B21DCCN740</div>
            </div>
            <div className="flex">
              <div className="w-[300px]">Email:</div>
              <div>TruongNT.B21DCCN740@stu.ptit.edu.vn</div>
            </div>
            <div className="flex">
              <div className="w-[300px]">Report Document:</div>
              <a href="https://drive.google.com/drive/folders/15n1pjjZUovHxgYOG7YXY4rrxo0s38J4J?usp=drive_link">
                <ArticleIcon />
              </a>
            </div>
            <div className="flex">
              <div className="w-[300px]">Github:</div>
              <a href="https://github.com/truongnt2607/IoT">
                <GitHubIcon />
              </a>
            </div>
            <div className="flex">
              <div className="w-[300px]">API Docs:</div>
              <a href="https://drive.google.com/drive/folders/15n1pjjZUovHxgYOG7YXY4rrxo0s38J4J?usp=drive_link">
                <InsertDriveFileIcon />
              </a>
            </div>
          </div>
          <div className="w-[100px] h-[100px] border-b-2 border-r-2 border-green-700 absolute bottom-10 right-0"></div>
        </div>
        <div className="flex-1 flex justify-center items-center relative">
          <div className="w-[80%] h-[80%] bg-teal-500 rounded-lg mt-16"></div>
          <img
            src="anh.jpg"
            alt=""
            className="scale-75 rounded-full absolute -top-5"
          />
          <div className="absolute text-3xl top-[300px]">
            Hello, I'm Truong!
          </div>
          <div className="absolute font-light w-[300px] text-center top-[370px]">
            I'm student majoring in Information Technology at Posts and
            Telecommunications Institute of Technology
          </div>
          <div className="flex absolute gap-3 top-[550px]">
            <a href="">
              <FacebookIcon sx={{ fontSize: "48px" }} />
            </a>
            <a href="">
              <InstagramIcon sx={{ fontSize: "48px" }} />
            </a>
            <a href="">
              {" "}
              <EmailIcon sx={{ fontSize: "48px" }} />
            </a>
            <a href="">
              <YouTubeIcon sx={{ fontSize: "48px" }} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
