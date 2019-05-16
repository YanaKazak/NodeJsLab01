#!/usr/bin/env node

const program = require("commander");
const chalk = require("chalk");
const inquirer = require("inquirer");
const mongoose = require("mongoose");

const move = require("./mover.js");

var data = new Date();
var str;

program.version("0.1.0")
    .option('create <a>, cr','Create new file')
    .option('delete <fn> [otherFiles...], del','Delete file(s)')
    .option('read <fn>, r','Read file')
    .option('write <yourtext>, wr','Write your information')
    .option('task <path>, t','Individual task')
    .parse(process.argv)



program.command("delete <fn> [otherFiles...]")
    .alias("del")
    .description("Delete file")
    .action((fn, otherFiles)=>{
        console.log("Will be deleted file: "+fn);
        move.deleteFile(fn);
        if(otherFiles){
            otherFiles.forEach(function(oFile) {
                console.log("Will be deleted file: " + oFile);
                move.deleteFile(oFile);
            }
        )}
    });

program.command("create <a>")
    .alias("cr")
    .description("Create new file")
    .action((a)=> {
        str = "1_9_Yana_"+data.getFullYear()+"_"+data.getHours()+"_"+data.getMinutes()+"_"+data.getSeconds()+".txt";
        move.createFile(str);
    });

program.command("read <fn>")
    .alias("r")
    .description("Read file")
    .action((fn)=>{
        move.readFile(fn);
    });

program.command("write [yourtext...]")
    .alias("wr")
    .description("Write your information")
    .action((yourtext)=>{
        data = new Date();
        str = data.getMinutes().toString()+"_"+data.getSeconds().toString()+".txt";
        console.log("Will be written '"+yourtext.toString().split(',').join(" ")+"' on file: "+str);
        move.writeFile(str,yourtext.toString().split(',').join(" "));
    });

program.command("task <path>")
    .alias("t")
    .description("Individual task")
    .action((path)=>{
        data = new Date();
        console.log("Will be done in directory -> "+path);
        move.individualTask(path,"result.txt")
    });

program.parse(process.argv);