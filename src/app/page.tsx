"use client";
import { RecoilRoot } from "recoil";
import Body from "./components/Body";
import Footer from "./components/Footer";
import Header from "./components/Header";

export default function Home() {
  return (
    <RecoilRoot>
      <Header />
      <Body />
      <Footer />
    </RecoilRoot>
  );
}
