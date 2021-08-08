use wasm_bindgen::prelude::*;
use web_sys::console;

// When the `wee_alloc` feature is enabled, this uses `wee_alloc` as the global
// allocator.
//
// If you don't want to use `wee_alloc`, you can safely delete this.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[derive(Clone,Copy)]
struct Rgb{
    r: u8,
    g: u8,
    b: u8,
}

#[wasm_bindgen]
pub struct Image{
    width: usize,
    height: usize,
    cellSize: usize,
    cells: Vec<Rgb>,
}

#[wasm_bindgen]
impl Image {
    #[wasm_bindgen(constructor)]
    pub fn new(width: usize,height: usize,cellSize:usize)-> Image{
        let mut cells= Vec::new();
        cells.resize(width*height,Rgb{r:200, g:200, b:255});
        Image{width,height,cellSize,cells}
    }

    pub fn cells(&self)-> Vec<u8>{
        return self.cells.iter().map(|&rgb| vec![rgb.r,rgb.g,rgb.b]).collect::<Vec<Vec<u8>>>().concat();
    }

    pub fn width(&self) -> usize {
        return self.width;
    }

    pub fn setWidth(&mut self,width:usize){
        self.width=width;
    }

    pub fn setHeight(&mut self,height:usize){
        self.height=height;
    }

    pub fn setCellSize(&mut self,cellSize:usize){
        self.cellSize=cellSize;
    }

    pub fn height(&self) -> usize {
        return self.height;
    }

    pub fn cellSize(&self) -> usize{
        return self.cellSize;
    }

    pub fn brush(&mut self, x:usize,y:usize,color:Vec<u8>){
        let index=(y*self.width)+x;
        self.cells[index]=Rgb{r:color[0],g:color[1],b:color[2]};
    }

    pub fn resize(&mut self,size:usize){
        self.cells.resize(size,Rgb{r:200, g:200, b:255});
    }

    pub fn clear(&mut self){
        for i in 0..self.width*self.height{
            self.cells[i]=Rgb{r:200, g:200, b:255};
        }
    }

}
