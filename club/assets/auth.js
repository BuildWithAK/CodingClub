// ----------------- Inline Editable Profile with Enter Key Save -----------------


import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-storage.js";

const editableFields = ["fullName","college","year"];
editableFields.forEach(id => {
  const el = document.getElementById(id);

  // Save on blur
  el.addEventListener("blur", async () => {
    await saveProfileField(id, el.textContent.trim());
  });

  // Save on Enter key
  el.addEventListener("keypress", async (e) => {
    if(e.key === "Enter"){
      e.preventDefault(); // prevent new line
      el.blur(); // trigger blur event to save
    }
  });
});

async function saveProfileField(id, value){
  if(currentUser && value){
    const updateObj = {};
    if(id==="fullName") updateObj.fullname = value;
    if(id==="college") updateObj.college = value;
    if(id==="year") updateObj.year = value;
    await updateDoc(doc(db, "users", currentUser.uid), updateObj);
  }
}

const storage = getStorage(app);

// Profile picture upload
const profilePicImg = document.getElementById("profile-pic");
const profilePicInput = document.getElementById("profilePicInput");

profilePicImg.addEventListener("click", () => {
  profilePicInput.click(); // trigger file input
});

profilePicInput.addEventListener("change", async (event) => {
  const file = event.target.files[0];
  if (!file) return;

  const storageRef = ref(storage, `profile_pics/${currentUser.uid}_${file.name}`);
  await uploadBytes(storageRef, file);
  const downloadURL = await getDownloadURL(storageRef);

  // Update Firestore user document
  await updateDoc(doc(db, "users", currentUser.uid), { picture: downloadURL });

  // Update profile pic in UI
  profilePicImg.src = downloadURL;
});
