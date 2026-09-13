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
    getShowLabels: ()=> {
      const stored = read().showLabels;
      return typeof stored === 'boolean' ? stored : true;
    },
    setShowLabels: (value)=>{const s=read(); s.showLabels=Boolean(value); write(s)},
    getPlayImageName: ()=> {
      const stored = read().playImageName;
      return typeof stored === 'boolean' ? stored : false;
    },
    setPlayImageName: (value)=>{const s=read(); s.playImageName=Boolean(value); write(s)},
    getVideoPauseSeconds: ()=> {
      const stored = Number(read().videoPauseSeconds);
      return Number.isFinite(stored) && stored >= 0 && stored <= 60 ? stored : 3;
    },
    setVideoPauseSeconds: (value)=>{
      const seconds = Number(value);
      const s=read();
      s.videoPauseSeconds = Number.isFinite(seconds) && seconds >= 0 && seconds <= 60 ? seconds : 3;
      write(s);
    }
  };
  window.MASettings = Settings;
})(window);
