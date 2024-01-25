window.onload = async () => {
  let script = await obtenerFormularioLC(document.getElementById('app_bsale_lc').getAttribute('shop'));
  if (script.error) document.getElementById('app_bsale_lc').innerHTML = script.error;
  else if (script) await cargarScriptLC(script);
};
const obtenerFormularioLC = async (shop) => {
  document.getElementById('app_bsale_lc').innerHTML = 'OBTENIENDO RESPUESTA...';
  let response = await fetch(encodeURI(`https://bsale.lobocreaciones.dev/api/shopify/themes/cart?shop=${shop}`)).catch((error) => { return { error: error }; });
  if (response.error) return response;
  let raw = await response.text();
  let html = new DOMParser().parseFromString(raw, "text/html");
  let script = html.getElementsByTagName('script')[0];
  if (script) html.body.removeChild(script);
  document.getElementById('app_bsale_lc').innerHTML = html.body.innerHTML;
  return script;
};
const cargarScriptLC = (oldScript) => {
  let newScript = document.createElement('script');
  newScript.type = 'text/javascript';
  newScript.async = true;
  newScript.innerHTML = oldScript.innerHTML;
  let head = document.getElementsByTagName('head')[0];
  head.appendChild(newScript); 
};
