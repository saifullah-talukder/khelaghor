fn main() {
    let s3 = String::from("Hello S🦀 💥 world");
    let s4 = &s3[0..8];

    println!("{}",s4);
}
