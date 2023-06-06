import type { ActionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { useEffect, useRef } from "react";
import { createNote } from "~/models/note.server";
import { requireUserId } from "~/session.server";
import {JSZip} from '@JSZip';
// Import the NFTStorage class and File constructor from the 'nft.storage' package
import { NFTStorage, File } from 'nft.storage'

// The 'mime' npm package helps us set the correct file type on our File objects
import mime from 'mime'

// The 'fs' builtin module on Node.js provides access to the file system
import fs from 'fs'

// The 'path' module provides helpesuccess
// Paste your NFT.Storage API key into the quotes:
const NFT_STORAGE_KEY = 'REPLACE_ME_WITH_YOUR_KEY'

/**
  * Reads an image file from `imagePath` and stores an NFT with the given name and description.
  * @param {string} imagePath the path to an image file
  * @param {string} name a name for the NFT
  * @param {string} description a text description for the NFT
  */
 async function storeNFT(imagePath, name, description) {
    // load the file from disk
    const image = await fileFromPath(imagePath)

    // create a new NFTStorage client using our API key
    const nftstorage = new NFTStorage({ token: NFT_STORAGE_KEY })

    // call client.store, passing in the image & metadata
    return nftstorage.store({
        image,
        name,
        description,
    })
}

/**
  * A helper to read a file from a location on disk and return a File object.
  * Note that this reads the entire file into memory and should not be used for
  * very large files. 
  * @param {string} filePath the path to a file to store
  * @returns {File} a File object containing the file content
  */
 async function fileFromPath(filePath) {
    const content = await fs.promises.readFile(filePath)
    const type = mime.getType(filePath)
    return new File([content], path.basename(filePath), { type })
}


/**
 * The main entry point for the script that checks the command line arguments and
 * calls storeNFT.
 * 
 * To simplify the example, we don't do any fancy command line parsing. Just three
 * positional arguments for imagePath, name, and description
 */
 async function processNFT() {
    const args = process.argv.slice(2)
    if (args.length !== 3) {
        console.error(`usage: ${process.argv[0]} ${process.argv[1]} <image-path> <name> <description>`)
        process.exit(1)
    }

    const [imagePath, name, description] = args
    const result = await storeNFT(imagePath, name, description)
    console.log(result)
}
function filePickImage(){
  let x = fileFromPath(y)
}
function filePickMeta(){
  let x = fileFromPath(y)
}
function process(){}
export default function nft(){
    const zip = new JSZip();
    const onChangeFile = () => {zip.loadAsync(content)
      .then(function(zip) {
          console.log("zip read"); 
      });}
    const action = async ({ request }: ActionArgs) => {
    const userId = await requireUserId(request);
  
    const formData = await request.formData();
    const file_location = formData.get("path");
    const body = formData.get("body");
  
    if (typeof file_location !== "string" || title.length === 0) {
      return json(
        { errors: { body: null, title: "Title is required" } },
        { status: 400 }
      );
    }
  
    if (typeof body !== "string" || body.length === 0) {
      return json(
        { errors: { body: "Body is required", title: null } },
        { status: 400 }
      );
    }
  
    const note = await createNote({ body, title, userId });
  
    return redirect(`/notes/${note.id}`);
  };
  
    const actionData = useActionData<typeof action>();
    const titleRef = useRef<HTMLInputElement>(null);
    const bodyRef = useRef<HTMLTextAreaElement>(null);
  
    useEffect(() => {
      if (actionData?.errors?.title) {
        titleRef.current?.focus();
      } else if (actionData?.errors?.body) {
        bodyRef.current?.focus();
      }
    }, [actionData]);
  return (
    <div>
    <div>
    <label className="flex w-full flex-col gap-1">
        <span>API KEY: </span>
        <input
          ref={titleRef}
          name="path"
          className="flex-1 rounded-md border-2 border-blue-500 px-3 text-lg leading-loose"
          aria-invalid={actionData?.errors?.title ? true : undefined}
          aria-errormessage={
            actionData?.errors?.title ? "title-error" : undefined
          }
        />
      </label>
      <label className="flex w-full flex-col gap-1">
        <span>Image Path: </span>
        <input
          multiple
          type="file"
          ref={titleRef}
          name="path"
          className="flex-1 rounded-md border-2 border-blue-500 px-3 text-lg leading-loose"
          aria-invalid={actionData?.errors?.title ? true : undefined}
          aria-errormessage={
            actionData?.errors?.title ? "title-error" : undefined
          }
          onChange={this.onChangeFile}
        />
        <div className="text-right">
      <button
        onClick="filePickImage()"
        className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:bg-blue-400"
      >
        ...
      </button>
    </div>
      </label>
      <label className="flex w-full flex-col gap-1">
        <span>Metadata Path: </span>
        <input
          multiple
          type="file"
          ref={titleRef}
          name="metadataPath"
          className="flex-1 rounded-md border-2 border-blue-500 px-3 text-lg leading-loose"
          aria-invalid={actionData?.errors?.title ? true : undefined}
          aria-errormessage={
            actionData?.errors?.title ? "title-error" : undefined
          }
          onChange={this.onChangeFile}
        />
        <div className="text-right">
      <button
        onClick="filePickMeta()"
        className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:bg-blue-400"
      >
        ...
      </button>
    </div>
      </label>
      {actionData?.errors?.title ? (
        <div className="pt-1 text-red-700" id="title-error">
          {actionData.errors.title}
        </div>
      ) : null}
    </div>
    <div>
      <label className="flex w-full flex-col gap-1">
        <span>Description: </span>
        <textarea
          ref={bodyRef}
          name="body"
          rows={8}
          className="w-full flex-1 rounded-md border-2 border-blue-500 px-3 py-2 text-lg leading-6"
          aria-invalid={actionData?.errors?.body ? true : undefined}
          aria-errormessage={
            actionData?.errors?.body ? "body-error" : undefined
          }
        />
      </label>
      {actionData?.errors?.body ? (
        <div className="pt-1 text-red-700" id="body-error">
          {actionData.errors.body}
        </div>
      ) : null}
    </div>

    <div className="text-right">
      <button
        onClick="process()"
        className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:bg-blue-400"
      >
        Post NFT
      </button>
    </div>
    </div>
  );
      }