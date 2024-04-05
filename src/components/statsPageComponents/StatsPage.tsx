
import ToggleButtons from "./ToggleButtons";
import Select from "./Select";

import ChartDataTable from "./ChartDataTable";
import DatePicker from "./DatePicker";
import './StatsPage.css';
import TabsStats from "./TabsStats";
import Header from "../ReusedComponents/Header";

export const StatsPage = () => {

  return (
    <>
    <Header/>
    <ToggleButtons/>
    <DatePicker />
    <Select/>
    <TabsStats/>
    
    <ChartDataTable/>
    </>
   
  );
};

export default StatsPage;