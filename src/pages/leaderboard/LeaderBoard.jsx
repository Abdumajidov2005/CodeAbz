import React, { useEffect, useState } from "react";
import "./LeaderBoard.css";
import { getLeaderBoard } from "../services/app";

function LeaderBoard() {
  const [ratingUser, setRatingUser] = useState(null);

  useEffect(() => {
    getLeaderBoard()?.then(setRatingUser);
  }, []);

  return (
    <>
      <div className="leaderboard">
        <div className="container">
          <ul className="user-title">
            <li>Avatar</li>
            <li>Username</li>
            <li>Email</li>
            <li>bios </li>
            <li>Score</li>
          </ul>
          <ul className="leaderboard-contents">
            {ratingUser?.map((item, index) => {
              return (
                <div key={item?.id} className="user-levles">
                  <li>
                    <div className="avatar">
                      <div className="avatar-border1">
                        <span className="rating-records">{index + 1}</span>
                        <img
                          src={item?.avatar || "/imgs/icons.png"}
                          onError={(e) => {
                            e.target.onerror = null; // loopdan saqlanish
                            e.target.src = "/imgs/icons.png";
                          }}
                          alt={item?.username}
                        />
                      </div>
                    </div>
                  </li>
                  <li>
                    <h1>{item?.username}</h1>
                    <p>{item?.country}</p>
                  </li>
                  <li>
                    <p>{item?.email}</p>
                  </li>
                  <li>
                    <p>{item?.bio}</p>
                  </li>
                  <li>
                    <p>{item?.score}</p>
                  </li>
                </div>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
}

export default LeaderBoard;
