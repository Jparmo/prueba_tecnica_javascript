const paddockManagers = [
  { id: 1, taxNumber: '132254524', name: 'JUAN TAPIA BURGOS'},
  { id: 2, taxNumber: '143618668', name: 'EFRAIN SOTO VERA'},
  { id: 3, taxNumber: '78903228', name: 'CARLOS PEREZ GONZALEZ'},
  { id: 4, taxNumber: '176812737', name: 'ANDRES VIÑALES CIENFUEGOS'},
  { id: 5, taxNumber: '216352696', name: 'OSCAR PEREZ ZUÑIGA'},
  { id: 6, taxNumber: '78684747', name: 'JOAQUIN ANDRADE SANDOVAL' }
];

// Tipo de cuartel, en el cual se utiliza el tipo de producto plantado
const paddockType = [
  { id: 1, name: 'PALTOS' },
  { id: 2, name: 'AVELLANOS' },
  { id: 3, name: 'CEREZAS' },
  { id: 4, name: 'NOGALES' },
]

// Un paddock representa un cuartel de un campo (Entiéndase también como potrero o parcela), el área está representada en m2, harvestYear es el año en el que se sembró el cuartel
const paddocks = [
  { paddockManagerId: 6, farmId: 1, paddockTypeId: 1, harvestYear: 2019, area: 1200 },
  { paddockManagerId: 1, farmId: 3, paddockTypeId: 4, harvestYear: 2019, area: 500 },
  { paddockManagerId: 5, farmId: 3, paddockTypeId: 2, harvestYear: 2020, area: 20000 },
  { paddockManagerId: 2, farmId: 2, paddockTypeId: 3, harvestYear: 2021, area: 8401},
  { paddockManagerId: 3, farmId: 1, paddockTypeId: 1, harvestYear: 2020, area: 2877 },
  { paddockManagerId: 5, farmId: 2, paddockTypeId: 2, harvestYear: 2017, area: 15902 },
  { paddockManagerId: 3, farmId: 3, paddockTypeId: 2, harvestYear: 2018, area: 1736 },
  { paddockManagerId: 2, farmId: 3, paddockTypeId: 3, harvestYear: 2020, area: 2965 },
  { paddockManagerId: 4, farmId: 3, paddockTypeId: 4, harvestYear: 2018, area: 1651 },
  { paddockManagerId: 5, farmId: 1, paddockTypeId: 1, harvestYear: 2018, area: 700 },
  { paddockManagerId: 1, farmId: 2, paddockTypeId: 1, harvestYear: 2019, area: 7956 },
  { paddockManagerId: 5, farmId: 3, paddockTypeId: 2, harvestYear: 2020, area: 3745 },
  { paddockManagerId: 6, farmId: 1, paddockTypeId: 3, harvestYear: 2021, area: 11362 },
  { paddockManagerId: 2, farmId: 3, paddockTypeId: 3, harvestYear: 2021, area: 300 },
  { paddockManagerId: 3, farmId: 2, paddockTypeId: 2, harvestYear: 2020, area: 19188 },
  { paddockManagerId: 3, farmId: 1, paddockTypeId: 1, harvestYear: 2019, area: 17137 },
  { paddockManagerId: 4, farmId: 3, paddockTypeId: 2, harvestYear: 2020, area: 100 },
  { paddockManagerId: 2, farmId: 1, paddockTypeId: 3, harvestYear: 2019, area: 11845 },
  { paddockManagerId: 5, farmId: 2, paddockTypeId: 1, harvestYear: 2018, area: 15969 },
  { paddockManagerId: 1, farmId: 3, paddockTypeId: 1, harvestYear: 2029, area: 10420 },
  { paddockManagerId: 5, farmId: 2, paddockTypeId: 3, harvestYear: 2010, area: 3200 },
  { paddockManagerId: 6, farmId: 1, paddockTypeId: 2, harvestYear: 2012, area: 10587 },
  { paddockManagerId: 2, farmId: 2, paddockTypeId: 2, harvestYear: 2018, area: 16750 }
];

const farms = [
  { id: 1, name: 'AGRICOLA SANTA ANA' },
  { id: 2, name: 'VINA SANTA PAULA' },
  { id: 3, name: 'FORESTAL Y AGRICOLA LO ENCINA' }
];


function listPaddockManagersByName() {
  // CODE HERE
paddockManagers.sort((o1, o2) => {
  if (o1.name < o2.name) {
    return -1;
  } else if (o1.name > o2.name) {
    return 1;
  }
  return 0;
});

const paddTax = paddockManagers.map((paddockManager) =>paddockManager.taxNumber) ;
return paddTax
};


function sortPaddockTypeByTotalArea() {
  const area_cultivo = paddockType.map(p=>{
      const areas ={}
      if(p.id){
        const pcd1 = paddocks.filter(padd=>padd.paddockTypeId===p.id)
                              .map(pad => pad.area/10000)
                              .reduce((p,v)=>p+v,0)
        areas['name'] = p.name
        areas['area'] = pcd1
      }
      return areas
    })
    
    const cultivo = area_cultivo.sort((o1,o2)=>o2.area-o1.area).map(p=>p.name)
    
    return cultivo 
}



function sortFarmManagerByAdminArea() {
  // CODE HERE
const area_cultivo = paddockManagers.map(p=>{
    const areas ={}
    if(p.id){
      const pcd1 = paddocks.filter(padd=>padd.paddockManagerId===p.id).map(pad => pad.area/10000).reduce((p,v)=>p+v,0)
      areas['name'] = p.name
      areas['area'] = pcd1
    }
    return areas
  })
  
  const nombres = area_cultivo.sort((o1,o2)=>o2.area-o1.area).map(p=>p.name) 
return nombres
}


function farmManagerNames() {
  // CODE HERE
const campoTax = {}

const taxNumbers = farms.map( farmo =>
  paddocks.filter(farm1 => farm1.farmId === farmo.id)
  .map(ids => paddockManagers.filter(idsa => ids.paddockManagerId === idsa.id))
  .map(pad=>pad[0]).sort((o1, o2) => {
  if (o1.name < o2.name) {
    return -1;
  } else if (o1.name > o2.name) {
    return 1;
  }
  return 0;
  })
  .map(tax=>tax.taxNumber))

for (let index = 1; index <= taxNumbers.length; index++) {
  const element = taxNumbers[index-1];
  const campo = farms.filter(farm => farm.id === index).map(farm=>farm.name)
  campoTax[campo] = element
}

return campoTax}


function biggestAvocadoFarms() {
  // CODE HERE
  const paltos = farms.map(campo =>
    paddocks
    .filter(palto=>palto.paddockTypeId === 1)
    .filter(farm => farm.farmId===campo.id)
    .map(hectarea => hectarea.area/10000)
    .reduce((a,p)=>a+p,0)
  ).filter(palto=>palto>2).sort((a,b)=>b-a)
  const paltoM2 = paltos.map(palto=>Math.ceil(palto*10000))
  return paltoM2
}

function biggestCherriesManagers() {
  // CODE HERE
const cerezasAdmins = paddocks
.filter(type => type.farmId===3)
.filter(farm=>farm.paddockTypeId===3)
.filter(field=>field.area>1000)
.map(paddock=>paddockManagers
  .filter(manager => manager.id === paddock.paddockManagerId)
  .map(nombres=>nombres.name))
.map(valor=>valor[0]).sort()

return cerezasAdmins

}


function farmManagerPaddocks() {
  // CODE HERE
  const adminCampos = paddockManagers.map( administrador =>{
  const admins = paddocks.filter(managerid=> managerid.paddockManagerId === administrador.id).map(campos => campos.farmId)
  const camposUnicos = admins.filter((val,index)=> admins.indexOf(val)===index)
  const nombresCampos = camposUnicos.map(campid => farms.filter(farms => farms.id === campid ).map(farm =>farm.name)).map(camp => camp[0]).sort()
  return nombresCampos}
  )
  const obj ={}
  for (let index = 0; index < paddockManagers.length; index++) {
    const element = adminCampos[index];
    const nombreManager = paddockManagers.filter(nombreId => nombreId.id===(index+1)).map(nombre => nombre.name)
    obj[nombreManager]=element
  }
  const sortedObj = Object.keys(obj).sort().reduce((accumulator, key) => {
    accumulator[key] = obj[key];
  
    return accumulator;
  }, {});
  return sortedObj
}



function paddocksManagers() {
  // CODE HERE

  const objtot ={}

  for (let index = 1; index <= paddockType.length; index++) {
    
  
  const paltos = paddocks.filter(tipopaddock => tipopaddock.paddockTypeId===index).map(anio => anio.harvestYear)
  const clave = paddockType.filter(idfruto=>idfruto.id===index).map(fruto=> fruto.name)
  const concatenacion = paltos.map(yr => clave[0] +'-'+ yr)
  
  const manager = paddocks.filter(tipopaddock => tipopaddock.paddockTypeId===index).map(idManager => idManager.paddockManagerId)
  const nombremanager =  manager.map(managerId => paddockManagers.filter(manId => manId.id === managerId).map(nombre => nombre.name)).map(camp => camp[0])
  
  
  
  
  const valores =[]
  const tot =[]
  
  for (let index = 0; index < concatenacion.length; index++) {
    const clave = manager[index];
    const valor = nombremanager[index];
    const obj = {}
    obj[clave]=valor
    valores.push(obj)
  }
  for (let index = 0; index < concatenacion.length; index++) {
    const clave = concatenacion[index];
    const valor = valores[index];
    const obj1 = {}
    obj1[clave]=valor
    tot.push(obj1)
  }
  for (let index = 0; index < tot.length; index++) {
    const element = tot[index];
    for(let clave in element){
      if(!clave.includes(Object.keys(objtot))){
        objtot[clave]={...objtot[clave],...element[clave]}    
      }else{
        objtot[clave]={...objtot[clave],...element[clave]}
      }
    }
  }
  
  }
  
  
  return objtot
  

}



function newManagerRanking() {
  // CODE HERE
const nuevoManager = [{ id: 7, taxNumber: "98684743", name: "JEFFREY PAREDES MOLINA" }]
const paddockManagersNuevo = paddockManagers.concat(nuevoManager)
const nuevoPaddock = [{paddockManagerId: 7, farmId: 1, paddockTypeId: 4, harvestYear: 2017, area: 900}]
const paddockNuevo = paddocks.concat(nuevoPaddock)
const area_cultivo = paddockManagersNuevo.map(p=>{
  const areas ={}
  if(p.id){
    const pcd1 = paddockNuevo.filter(padd=>padd.paddockManagerId===p.id).map(pad => pad.area/10000).reduce((p,v)=>p+v,0)
    areas['name'] = p.name
    areas['area'] = pcd1
  }
  return areas
})
const nombres = area_cultivo.sort((o1,o2)=>o2.area-o1.area).map(p=>p.name) 
const indice = nombres.indexOf(nuevoManager[0]['name'])
const lugar = indice + 1
const mensaje = 'El lugar del manager ' +  nuevoManager[0]['name'] + ' es ' + lugar + ' de ' + nombres.length

return mensaje

}


console.log('Pregunta 0');
console.log(listPaddockManagerIds());
console.log('Pregunta 1');
console.log(listPaddockManagersByName());
console.log('Pregunta 2');
console.log(sortPaddockTypeByTotalArea());
console.log('Pregunta 3');
console.log(sortFarmManagerByAdminArea());
console.log('Pregunta 4');
console.log(farmManagerNames());
console.log('Pregunta 5');
console.log(biggestAvocadoFarms());
console.log('Pregunta 6');
console.log(biggestCherriesManagers());
console.log('Pregunta 7');
console.log(farmManagerPaddocks());
console.log('Pregunta 8');
console.log(paddocksManagers());
console.log('Pregunta 9');
console.log(newManagerRanking());