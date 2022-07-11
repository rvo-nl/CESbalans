
var processedDataSet;
var clusterLoadState = {};
var loadInitFlag = true;
var rawDataInput;


function loadDataViaDragDrop(data){
  console.log(data)
  var workbook = XLSX.read(data);
  rawDataInput = XLSX.utils.sheet_to_json(workbook.Sheets['Sheet1']);
  console.log(rawDataInput)
  processData(rawDataInput)

    setTimeout(godoit, 3000);

    function godoit() {
      tekenCESDiagrammen({
        // datapath: "/src/assets/CES.csv",
        targetDiv: "page",
        clusterSelectie: Object.keys(processedDataSet)[0],
      });
      initClusterSelector();
  }
}



function loadDataViaURL(url){
/* set up async GET request */
var req = new XMLHttpRequest();
req.open("GET", url, true);
req.responseType = "arraybuffer";
req.onload = function(e) {
  console.log(req.response)
  var workbook = XLSX.read(req.response);
  rawDataInput = XLSX.utils.sheet_to_json(workbook.Sheets['Sheet1']);
  processData(rawDataInput)
};
req.send();
setTimeout(godoit, 1000); // DEZE AANPASSEN BIJ DEPLOY

function godoit() {
  tekenCESDiagrammen({
    // datapath: "/src/assets/CES.csv",
    targetDiv: "page",
    clusterSelectie: Object.keys(processedDataSet)[0]
  });
  initClusterSelector();
}

}

// loadDataViaURL();

function loadDataViaButton(){

}


function processData(rawDataInput){
  if (loadInitFlag){
    d3.select('#app').style('min-height','3000px');
    d3.select('#menu').remove();  
    d3.select('#start').remove();
    d3.select('#clusterSelector').style('transform','scale(0)')
    setTimeout(function(){d3.select('#clusterSelector').transition().duration(250).style('opacity',1).style('transform','scale(1)')},1000);
    d3.select('#loading').style('visibility','visible');
    setTimeout(function(){d3.select('#loading').style('visibility','hidden');},2000);
    d3.select('#sjabloon').remove();
    d3.select('#page').style('background-color','#eceff1')
    d3.select('#page').style('border-width','5px')
    d3.select('#page').style('box-shadow','rgba(0, 0, 0, 0.35) 0px 5px 15px')
    d3.select('#subtitle').remove();
    
    // d3.select('#page').style('border-width','5px')
    loadInitFlag = false;

    setTimeout(function(){appendPatterns();},6000);

  }

  var datadict = {};
  processedDataSet = {}

  var sankeydata;

  // list clusters
  for (i=0;i<rawDataInput.length;i++){
    if (rawDataInput[i].functie == 'appendCluster'){
      datadict[rawDataInput[i].cluster] = [];
      processedDataSet[rawDataInput[i].cluster] = {};
    }
  } 
  // fill clusters
  for (i=0;i<Object.keys(datadict).length;i++){
    var currentCluster = Object.keys(datadict)[i];
    for (k=0;k<rawDataInput.length;k++){
      if (rawDataInput[k].cluster == currentCluster){
        datadict[currentCluster].push(rawDataInput[k])
      }
    }
  }

  //--------------
  //-------------- genereer visualisatiedataset sankey
  //--------------

  // console.log(datadict)
  // genereer databron voor sankey diagram
  var processSankeyDatastore = {};

  // doen voor alle clusters
  for (i=0;i<Object.keys(datadict).length;i++){
    var currentCluster = Object.keys(datadict)[i];
    // maak voor ieder cluster een aantal data object containers aan
    processSankeyDatastore[currentCluster] = {sankeydata_raw:[],sankeydata: {"nodes" : [], "links" : [], "attributes": {}}};
  
    // kopieer per cluster alle data onder functie 'sankey' naar array 'sankeydata_raw'
    for (k=0;k<rawDataInput.length;k++){
      if (rawDataInput[k].cluster == currentCluster && rawDataInput[k].functie == 'sankey'){
        processSankeyDatastore[currentCluster].sankeydata_raw.push(rawDataInput[k]) 
      }
    }
  }
  // console.log(processSankeyDatastore)
  for (i=0;i<Object.keys(datadict).length;i++){
    // converteer data in 'sankeydata_raw' naar visualisatieformat
    var currentCluster = Object.keys(datadict)[i];
    let rowcount = processSankeyDatastore[currentCluster].sankeydata_raw.length;
    // genereer 'sankeydata' dataobjects
    for (j=0;j<rowcount;j++){
      var d = processSankeyDatastore[Object.keys(datadict)[i]].sankeydata_raw[j];
      // console.log(d);
      processSankeyDatastore[currentCluster].sankeydata.nodes.push({ "name": d.sankey_bron});
      processSankeyDatastore[currentCluster].sankeydata.nodes.push({ "name": d.sankey_doel});
      processSankeyDatastore[currentCluster].sankeydata.links.push({ "source": d.sankey_bron, "target": d.sankey_doel, "value": +d.waarde, "conversionType": d.sankey_drager, "type": d.sankey_drager, "notes": d.aantekeningen, "notesPosition": d.sankey_aantekeningenpositie, "aandachtspunt": d.aandachtspunt});

    }
  }
  // console.log(processSankeyDatastore)
  
  // store sankeydataobjects in processedDataSet
  for (i=0;i<Object.keys(processedDataSet).length;i++){
    var currentCluster = Object.keys(processedDataSet)[i];
    processedDataSet[currentCluster]['sankeydata'] = processSankeyDatastore[currentCluster].sankeydata;
  }

  //------------------- 
  //------------------- genereer visualisatiedataset algemeen (titels, versienummer, teksten), besparing en substitutie
  //------------------- 

  for (m=0;m<Object.keys(processedDataSet).length;m++){
    var currentCluster = Object.keys(processedDataSet)[m];

    processedDataSet[currentCluster]['algemeen'] = {}
    processedDataSet[currentCluster]['besparing'] = {}
    processedDataSet[currentCluster]['besparing']['gas'] = {}
    processedDataSet[currentCluster]['besparing']['elektriciteit'] = {}
    processedDataSet[currentCluster]['besparing']['overige'] = {}
    processedDataSet[currentCluster]['besparing']['onbekend'] = {}
    processedDataSet[currentCluster]['substitutie'] = {}
    processedDataSet[currentCluster]['substitutie']['gas'] = {}
    processedDataSet[currentCluster]['substitutie']['elektriciteit'] = {}
    processedDataSet[currentCluster]['substitutie']['overige'] = {}
    processedDataSet[currentCluster]['substitutie']['onbekend'] = {}
    
    for (k=0;k<datadict[currentCluster].length; k++){
      var d = datadict[currentCluster][k];
      if (d.cluster == currentCluster && d.functie == 'algemeen'){
        processedDataSet[currentCluster]['algemeen'][d['attribuut']] = d['waarde'];
      }
      if (d.cluster == currentCluster && d.functie == 'besparing'){
        processedDataSet[currentCluster]['besparing'][d['attribuut']] = {'notes': d.aantekeningen, 'aandachtspunt': d.aandachtspunt}
      }
      if (d.cluster == currentCluster && d.functie == 'substitutie'){
        processedDataSet[currentCluster]['substitutie'][d['attribuut']] = {'notes': d.aantekeningen, 'aandachtspunt': d.aandachtspunt}
      }
    }
  }

  //------------------- 
  //------------------- genereer visualisatiedataset watervaldiagram subsitutie
  //------------------- 

  for (m=0;m<Object.keys(datadict).length;m++){
    var currentCluster = Object.keys(processedDataSet)[m];
    processedDataSet[currentCluster]['substitutie']['watervaldiagram'] = [];
    processedDataSet[currentCluster]['besparing']['staafdiagram'] = [];
    processedDataSet[currentCluster]['CO2'] = {};
    processedDataSet[currentCluster]['CO2']['watervaldiagram'] = [];
    for (h=0;h<datadict[currentCluster].length;h++){
      var d = datadict[currentCluster][h];
      // console.log(d)
      if (d.functie == 'substitutie' ){
        processedDataSet[currentCluster]['substitutie']['watervaldiagram'].push({'name': d.attribuut,'value': d.waarde,'notes': d.aantekeningen, 'aandachtspunt': d.aandachtspunt})
      }
      if (d.functie == 'besparing' ){
        processedDataSet[currentCluster]['besparing']['staafdiagram'].push({'name': d.attribuut,'value': d.waarde,'notes': d.aantekeningen, 'aandachtspunt': d.aandachtspunt})
      }
      if (d.functie == 'co2balans-scope1' || d.functie == 'co2balans-scope2' || d.functie == 'co2balans-scope3'){
        processedDataSet[currentCluster]['CO2']['watervaldiagram'].push({'name': d.attribuut,'value': d.waarde,'notes': d.aantekeningen, 'aandachtspunt': d.aandachtspunt})
      } 
    }
  }

  // processedDataSet_original = processedDataSet;
  for (i=0;i<Object.keys(processedDataSet).length;i++){
    clusterLoadState[[Object.keys(processedDataSet)[i]]] = true;
  }
  console.log(clusterLoadState)



  const prepDataCO2WFD = (data) => {

      // create stacked remainder
      const insertStackedRemainderAfter = (dataName, newDataName) => {
        const index = data.findIndex((datum) => { 
          return datum.name === dataName;
        }); // data.findIndex
        // console.log(data)
        return data.splice(index + 1, 0, {
          name: newDataName,
          start: data[index].end,
          end: 0,
          class: 'total',
        }); // data.splice
      }; // insertStackedRemainder
    
      // retrieve total value
      let cumulative = 0;
      
      // Transform data (i.e., finding cumulative values and total) for easier charting
      data.map((datum) => {
        datum.start = cumulative;
        cumulative +=parseFloat(datum.value);
        datum.end = cumulative;
        return datum.class = datum.value >= 0 ? 'positive' : 'negative';
      }); // data.map
    
      insertStackedRemainderAfter('nieuwebedrijven', 'Totale CO2-reductie');
    
      // return drawWaterfall(data);
      
    }; // prepDataCO2WFD(){}

    console.log()
    d3.select('#statusMessage').html("Status: "+Object.keys(processedDataSet).length+" clusters ingeladen");


    // for (h=0;h<Object.keys(datadict).length;h++){
    //   var currentCluster = Object.keys(processedDataSet)[h];
    //   // consoo
    //   prepDataCO2WFD(processedDataSet[currentCluster].CO2.watervaldiagram);
    //   prepDataEnergieSubstitutieWFD(processedDataSet[currentCluster].substitutie.watervaldiagram);
    // }





  // for (m=0;m<Object.keys(datadict).length;m++){
  //   var currentCluster = Object.keys(processedDataSet)[m];
  //   prepDataEnergieSubstitutieWFD(processedDataSet[currentCluster].substitutie.watervaldiagram);
  //   // console.log(processedDataSet[currentCluster].substitutie.watervaldiagram)
  // }
  
  // d3.select('#loading').style('visibility','hidden');

};

// console.log('OK')