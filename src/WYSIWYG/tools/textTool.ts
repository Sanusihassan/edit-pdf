/**
 * this is the page component i'm passing:
 * {$$typeof: Symbol(react.element), type: 'div', key: '1', ref: null, props: {…}, …}
$$typeof
: 
Symbol(react.element)
key
: 
"1"
props
: 
{className: 'page', id: 'page_0', style: {…}, children: Array(127)}
ref
: 
null
type
: 
"div"
_owner
: 
null
_store
: 
{validated: false}
_self
: 
null
_source
: 
null
[[Prototype]]
: 
Object
 */
// what do i need to change in this function is to create a Text component which is available in the ./components/Text.tsx and add it to the clicked page 
export const textToolHandler = (
  e: Event,
  page: HTMLDivElement | Element | null
): void => {
  const text = document.createElement("div");
  text.className = "text";
  console.log(page);
  return;
  text.setAttribute("contenteditable", "true");
  if (!page) return;
  const { x, y } = e as MouseEvent;

  // Calculate the relative coordinates
  let rect = page.getBoundingClientRect();
  text.style.left = `${x}px`;
  text.style.top = `${y}px`;
  page?.appendChild(text);
  text.focus();
};
