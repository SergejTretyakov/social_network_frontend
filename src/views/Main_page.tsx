import { useState } from "react";
import MainPage from "../components/layouts/desktop/MainPage";
import MainPageMobile from "../components/layouts/mobile/MainPageMobile";
import { useMediaQuery } from "@prismane/core/hooks";
import { Flex } from "@prismane/core";


const Main_Page = () => {
  const isMobile = useMediaQuery("(max-width: 1024px)");
    
    return (
      <Flex id="flex">
        {isMobile ? <MainPageMobile/> : <MainPage/>}
      </Flex>
    );
    
  };
  
  export default Main_Page;
  