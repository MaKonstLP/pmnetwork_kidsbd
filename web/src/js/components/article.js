export default class Article{

	constructor(){
		// this.removeHeader();
		// this.bildHeader();
		let self = this;
		console.log(innerWidth);
		
		window.addEventListener('scroll', function() {
			console.log(innerWidth);
		if(window.innerWidth >= 1799){	
			if (pageYOffset > 100){
				self.removeHeader();
				self.bildHeader();
			}
			else if(pageYOffset <= 100){
				self.getHeader();
			}
			}
		else {document.getElementsByClassName('city')[0].style.display = "none";
		document.getElementsByClassName('scroll_block')[0].style.display = "none";}
		})
		
	}
	removeHeader(){
		//функция удаляет меню и блок с выбором города из header
		let city = document.getElementsByClassName('city')[0];
		let menu = document.getElementsByClassName('header_menu')[0];
		city.style.display = "none";
		menu.style.display = "none";
		// city.remove();
		// menu.remove();
	}
	getHeader(){
		let city = document.getElementsByClassName('city')[0];
		let menu = document.getElementsByClassName('header_menu')[0];
		let block = document.getElementsByClassName('scroll_block')[0];
		city.style.display = "flex";
		menu.style.display = "flex";
		if(block){block.remove();}
	}
	bildHeader(){
		//функция добавляет новый блок в header для страницы /article/
		let block = document.getElementsByClassName('scroll_block')[0];
		if (!block) {
		//добавляем родительский блок
		let newBlock = document.createElement("div");
		newBlock.className="scroll_block";
		let parent = document.getElementsByClassName('top')[0];
		let beforElem = parent.getElementsByClassName('right_block')[0];
		parent.insertBefore(newBlock,beforElem);

		//добавляем блок с кнопкой
		let linkButt = document.createElement('a');
		linkButt.setAttribute('href', '/');
		newBlock.appendChild(linkButt);

		let newButt = document.createElement('button');
		newButt.className = "scroll_block_button";
		linkButt.appendChild(newButt);
		newButt.innerHTML = "Перейти в каталог площадок";

		//добавляем в родительский блок, блок с текстом
		let text = document.getElementsByTagName('h1')[0].innerHTML;
		let newText = document.createElement('p');
		newText.className = "scroll_block_text";
		newBlock.insertBefore(newText, linkButt);
		newText.innerHTML = text;

		}
	}
}