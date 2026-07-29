/* Simple settings helper stored in localStorage */
(function(window){
  const KEY = 'masteringai.settings.v1';
  function read(){
    try{return JSON.parse(localStorage.getItem(KEY) || '{}')}catch(e){return {}}}
  function write(obj){localStorage.setItem(KEY, JSON.stringify(obj||{}))}
  const Settings = {
    getAll:()=>read(),
    getMode: ()=> (read().mode) || 'flashcard',
    setMode: (m)=>{const s=read(); s.mode=m; write(s)},
  };
  window.MASettings = Settings;
})(window);
