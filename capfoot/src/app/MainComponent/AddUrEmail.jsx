import React from "react";

export default function AddUrEmail() {
    return (
        <div className="pt-20 bg-white pb-3 md:pb-0">
            <div className="relative sm:py-16">
                <div aria-hidden="true" className="hidden sm:block">
                    <div className="absolute inset-y-0 left-0 w-1/2 bg-gray-50 rounded-r-3xl"></div>
                    <img
                        className="absolute top-4 left-1/2 transform -translate-x-1/2 w-full max-w-xs h-auto transition ease-in-out duration-300"
                        src="https://d1w019qw3bn26k.cloudfront.net/assets/patterns/dots-d961e9ea516df1683f513c8b487098915d6d8e473b5c3fbebccf0d801c6d09e1.png"
                        alt="pattern"
                    />
                    <svg
                        className="absolute top-0 hidden -ml-3 left-1/2"
                        width="404"
                        height="392"
                        fill="none"
                        viewBox="0 0 404 392"
                    >
                        <defs>
                            <pattern
                                id="8228f071-bcee-4ec8-905a-2a059a2cc4fb"
                                x="0"
                                y="0"
                                width="20"
                                height="20"
                                patternUnits="userSpaceOnUse"
                            >
                                <rect
                                    x="0"
                                    y="0"
                                    width="4"
                                    height="4"
                                    className="text-gray-200"
                                    fill="currentColor"
                                ></rect>
                            </pattern>
                        </defs>
                        <rect
                            width="404"
                            height="392"
                            fill="url(#8228f071-bcee-4ec8-905a-2a059a2cc4fb)"
                        ></rect>
                    </svg>
                </div>
                <div className="relative max-w-md px-4 mx-auto sm:max-w-3xl sm:px-6 lg:max-w-7xl lg:px-8">
                    <div className="relative px-6 py-10 overflow-hidden shadow-xl rounded-3xl bg-blue-600 sm:px-12 sm:py-20">
                        <div
                            aria-hidden="true"
                            className="absolute inset-0 -mt-72 sm:-mt-32 md:mt-0"
                        >
                            <svg
                                className="absolute inset-0 w-full h-full"
                                preserveAspectRatio="xMidYMid slice"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 1463 360"
                            >
                                <path
                                    className="text-blue-500 text-opacity-40"
                                    fill="currentColor"
                                    d="M-82.673 72l1761.849 472.086-134.327 501.315-1761.85-472.086z"
                                ></path>
                                <path
                                    className="text-blue-700 text-opacity-40"
                                    fill="currentColor"
                                    d="M-217.088 544.086L1544.761 72l134.327 501.316-1761.849 472.086z"
                                ></path>
                            </svg>
                        </div>
                        <div className="relative">
                            <div className="mb-12 text-center">
                                <h2 className="text-4xl font-extrabold text-white tracking-tight sm:text-4.5xl">
                                    Be the First to Reserve
                                </h2>
                                <p className="max-w-2xl mx-auto mt-6 text-lg text-blue-100">
                                    Enter your email to be one of the first users to see and reserve
                                    the best times to play football with your friends at our top-notch stadium. Join
                                    over <strong>500</strong> football enthusiasts who regularly book their playtime with us.
                                </p>
                            </div>
                            <form
                                target="_blank"
                                className="sm:mx-auto sm:max-w-lg sm:flex"
                                action="https://www.yourreservationlink.com"
                                acceptCharset="UTF-8"
                                method="post"
                            >
                                <div className="relative w-full max-w-xl mx-auto bg-white rounded-full h-14 lg:max-w-none">
                                    <input
                                        className="rounded-full w-full h-14 bg-transparent py-0 sm:pl-6 pl-5 pr-16 sm:pr-32 outline-none border-2 border-gray-100 shadow-md hover:outline-none focus:ring-blue-200 focus:border-blue-200"
                                        required
                                        placeholder="Enter your email"
                                        autoComplete="email"
                                        type="email"
                                        name="member[email]"
                                        id="member[email]"
                                    />
                                    <button
                                        type="submit"
                                        className="absolute inline-flex items-center h-12 p-4 text-sm text-white transition duration-150 ease-in-out rounded-r-full rounded-bl-full outline-none right-1 top-1 bg-blue-600 sm:py-2 sm:px-6 sm:rounded-full sm:text-base sm:font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="-ml-0.5 sm:-ml-1 sm:mr-2 h-5 w-5"
                                            width="44"
                                            height="44"
                                            viewBox="0 0 24 24"
                                            strokeWidth="1.5"
                                            stroke="currentColor"
                                            fill="none"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <path
                                                stroke="none"
                                                d="M0 0h24v24H0z"
                                                fill="none"
                                            ></path>
                                            <line
                                                x1="10"
                                                y1="14"
                                                x2="21"
                                                y2="3"
                                            ></line>
                                            <path
                                                d="M21 3l-6.5 18a0.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a0.55 .55 0 0 1 0 -1l18 -6.5"
                                            ></path>
                                        </svg>
                                        <span className="hidden sm:inline-block">
                                            Reserve Now
                                        </span>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
